import os
import random
from super_hero.models import SuperHero, FavoriteHero, Team, TeamHero

TEAM_SIZE = int(os.getenv("TEAM_SIZE", 5))


def hero_score(hero):
    return (
        hero.intelligence
        + hero.strength
        + hero.speed
        + hero.durability
        + hero.power
        + hero.combat
    )


def balanced_team(heroes=None):
    team = []
    if not heroes:
        return team, "No heroes provided."

    # heroes = list(heroes
    heros_alignment = {"good": [], "bad": [], "neutral": []}

    for h in heroes[:2]:
        print(h.name, h.alignment)
        heros_alignment[h.alignment].append(h)

    if len(heros_alignment["good"]) > 0:
        team.append(random.choice(heros_alignment["good"]))
    if len(heros_alignment["bad"]) > 0:
        team.append(random.choice(heros_alignment["bad"]))
    if len(heros_alignment["neutral"]) > 0:
        team.append(random.choice(heros_alignment["neutral"]))

    remaining = list(set(heroes) - set(team))
    team.extend(random.sample(remaining, TEAM_SIZE - len(team)))

    print("Balanced Team:", [h.name for h in team])
    return team, "A balanced mix of heroes, villains, and neutral characters."


def power_team(heroes=None, stat=None):
    if not heroes:
        return [], "No heroes provided."

    if not stat:
        return [], "No stat provided for power-based team."

    team_heroes = sorted(
        heroes,
        key=lambda h: getattr(h, stat),
        reverse=True,
    )
    return team_heroes[:TEAM_SIZE], f"Optimized for maximum {stat}."


def random_team(heroes=None):
    if not heroes:
        return [], "No heroes provided."

    return random.sample(list(heroes), TEAM_SIZE), "Randomly generated team for fun."


def favorites_based_team(heroes=None, user=None):
    favorites = FavoriteHero.objects.filter(user=user).select_related("hero")

    if not favorites.exists():
        return random_team(heroes)

    avg_stats = {
        "intelligence": 0,
        "strength": 0,
        "speed": 0,
        "durability": 0,
        "power": 0,
        "combat": 0,
    }

    for fav in favorites:
        for stat in avg_stats:
            avg_stats[stat] += getattr(fav.hero, stat)

    count = favorites.count()
    for stat in avg_stats:
        avg_stats[stat] /= count

    def similarity(hero):
        return sum(
            abs(getattr(hero, stat) - avg_stats[stat])
            for stat in avg_stats
        )

    team_heroes = sorted(
        SuperHero.objects.exclude(
            id__in=favorites.values_list("hero_id", flat=True)
        ),
        key=similarity,
    )

    return team_heroes[:TEAM_SIZE], "Based on your favorite heroes."
