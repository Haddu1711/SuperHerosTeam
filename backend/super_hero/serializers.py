from rest_framework import serializers
from .models import SuperHero


class SuperHeroListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuperHero
        fields = ("id", "name", "slug", "alignment", "publisher",
                  "image_url", "intelligence", "strength", "speed",
                  "durability", "power", "combat")

class SuperHeroDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuperHero
        fields = "__all__"