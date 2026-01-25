from rest_framework import serializers
from .models import SuperHero, FavoriteHero, TeamHero, Team


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


class TeamHeroListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuperHero
        fields = ("id", "name", "slug",
                  "image_url")


class TeamHeroSerializer(serializers.ModelSerializer):
    hero = TeamHeroListSerializer()

    class Meta:
        model = TeamHero
        fields = ("hero",)


class TeamSerializer(serializers.ModelSerializer):
    members = TeamHeroSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = (
            "id",
            "name",
            "description",
            "team_type",
            "team_strength",
            "status",
            "is_public",
            "score",
            "explanation",
            "created_at",
            "members",
        )


class TeamHeroDetailSerializer(serializers.ModelSerializer):
    hero = SuperHeroListSerializer(read_only=True)

    class Meta:
        model = TeamHero
        fields = ("hero",)


class TeamDetailSerializer(TeamSerializer):
    members = TeamHeroDetailSerializer(many=True, read_only=True)
