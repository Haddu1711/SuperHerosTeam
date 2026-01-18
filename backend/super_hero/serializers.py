from rest_framework import serializers
from .models import SuperHero, FavoriteHero


class SuperHeroListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuperHero
        fields = ("id", "name", "slug", "alignment", "publisher",
                  "image_url", "intelligence", "strength", "speed",
                  "durability", "power", "combat")


class SuperHeroDetailSerializer(serializers.ModelSerializer):
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = SuperHero
        fields = "__all__"

    def get_is_favorite(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return None

        return FavoriteHero.objects.filter(
            user=request.user,
            hero=obj
        ).exists()


class UserFavSuperHeroListSerializer(serializers.ModelSerializer):
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = SuperHero
        fields = ("id", "name", "slug", "alignment", "publisher",
                  "image_url", "intelligence", "strength", "speed",
                  "durability", "power", "combat", "is_favorite")

    def get_is_favorite(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return None

        return FavoriteHero.objects.filter(
            user=request.user,
            hero=obj
        ).exists()
