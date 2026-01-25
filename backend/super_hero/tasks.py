import math

from celery import shared_task
from django.utils import timezone

from .models import SuperHero, Team, TeamGenerationJob, TeamHero
from .services import (balanced_team, favorites_based_team, hero_score,
                       power_team, random_team)


def identify_team_strength(score):
    if score >= 75:
        return "strong"
    elif score >= 50:
        return "average"
    else:
        return "weak"


@shared_task(bind=True, max_retries=1)
def generate_recommended_teams(self, job_id):
    job = TeamGenerationJob.objects.get(id=job_id)
    job.status = "running"
    job.save(update_fields=["status"])

    try:
        super_heroes = SuperHero.objects.all()

        strategies = [
            {
                "team_type": "balanced",
                "category": None,
                "generator": balanced_team,
                "kwargs": {},
            },
            {
                "team_type": "power",
                "category": "strength",
                "generator": power_team,
                "kwargs": {"stat": "strength"},
            },
            {
                "team_type": "power",
                "category": "intelligence",
                "generator": power_team,
                "kwargs": {"stat": "intelligence"},
            },
            {
                "team_type": "power",
                "category": "speed",
                "generator": power_team,
                "kwargs": {"stat": "speed"},
            },
            {
                "team_type": "power",
                "category": "durability",
                "generator": power_team,
                "kwargs": {"stat": "durability"},
            },
            {
                "team_type": "power",
                "category": "power",
                "generator": power_team,
                "kwargs": {"stat": "power"},
            },
            {
                "team_type": "power",
                "category": "combat",
                "generator": power_team,
                "kwargs": {"stat": "combat"},
            },
            {
                "team_type": "random",
                "category": None,
                "generator": random_team,
                "kwargs": {},
            },
            {
                "team_type": "favorites",
                "category": None,
                "generator": favorites_based_team,
                "kwargs": {"user": job.user},
            },
        ]

        for strategy in strategies:
            team_type = strategy["team_type"]
            power_category = strategy["category"]
            generator = strategy["generator"]
            extra_kwargs = strategy.get("kwargs", {})

            # Always pass heroes explicitly
            team_heroes, explanation = generator(
                heroes=super_heroes,
                **extra_kwargs,
            )

            print("Created TEAM HEROS:::",
                  [h.name for h in team_heroes])

            team_score = math.floor(sum(hero_score(h)
                                        for h in team_heroes)/(len(team_heroes) * 6))
            team_strength = identify_team_strength(team_score)

            team = Team.objects.create(
                user=job.user,
                name=f"{power_category.title() if power_category else team_type.title()} Team",
                team_type=team_type,
                power_category=power_category,
                description=explanation,
                score=team_score,
                team_strength=team_strength,
            )

            print("Created Team:", team.name, "with heroes:",
                  [h.name for h in team_heroes])

            TeamHero.objects.bulk_create(
                [TeamHero(team=team, hero=h) for h in team_heroes]
            )

        job.status = "completed"
        job.completed_at = timezone.now()
        job.save()

    except Exception as exc:
        job.status = "failed"
        job.error = str(exc)
        job.save()
        print("Task failed with exception:", str(exc))
        raise self.retry(exc=exc)
