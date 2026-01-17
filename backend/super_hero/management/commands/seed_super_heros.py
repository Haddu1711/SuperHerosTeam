import os
import requests
from django.core.management.base import BaseCommand
from super_hero.models import SuperHero

# official Count from SuperHero API
TOTAL_HEROES = 731


def to_int(value):
    """
    Safe conversion to integer. 
    """
    try:
        return int(value)
    except (TypeError, ValueError):
        return 0


class Command(BaseCommand):
    help = "Seed superheroes from SuperHero API into the database."

    def handle(self, *args, **options):
        token = os.getenv("SUPERHERO_API_TOKEN")

        if not token:
            raise ValueError(
                "SUPERHERO_API_TOKEN is not set in environment variables.")

        base_url = f"https://superheroapi.com/api/{token}"

        created = 0
        updated = 0

        for hero_id in range(1, TOTAL_HEROES + 1):
            try:
                response = requests.get(f"{base_url}/{hero_id}", timeout=10)
                data = response.json()
            except Exception as e:
                print(f"Failed to fetch hero id: {hero_id}: {e}")
                continue

            if data.get("response") != "success":
                print(f"Response not success for hero id: {hero_id}")
                continue

            hero, is_created = SuperHero.objects.update_or_create(
                id=int(data["id"]),
                defaults={
                    "name": data["name"],
                    "alignment": data["biography"].get("alignment", "neutral"),
                    "publisher": data["biography"].get("publisher"),
                    "image_url": data["image"].get("url"),
                    "intelligence": to_int(data["powerstats"].get("intelligence")),
                    "strength": to_int(data["powerstats"].get("strength")),
                    "speed": to_int(data["powerstats"].get("speed")),
                    "durability": to_int(data["powerstats"].get("durability")),
                    "power": to_int(data["powerstats"].get("power")),
                    "combat": to_int(data["powerstats"].get("combat")),
                    "biography": data.get("biography", {}),
                    "appearance": data.get("appearance", {}),
                    "work": data.get("work", {}),
                    "connections": data.get("connections", {}),
                },
            )

            if is_created:
                created += 1
            else:
                updated += 1

            print(
                f"Processed hero id: {hero_id} - {'Created' if is_created else 'Updated'}")

        print(
            f"Seeding completed for SuperHeros\n Created: {created}, Updated: {updated}"
        )
