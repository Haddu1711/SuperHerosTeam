from django.contrib import admin

from .models import FavoriteHero, SuperHero, Team, TeamGenerationJob, TeamHero

# Register your models here.


@admin.register(SuperHero)
class SuperHeroAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "alignment", "publisher")
    search_fields = ("name", "publisher", "alignment")
    ordering = ("id",)
    readonly_fields = ("slug",)
    list_filter = ("alignment", "publisher")

    fieldsets = (
        (None, {
            "fields": ("id", "name", "slug", "alignment", "publisher", "image_url")
        }),
        ("Powerstats", {
            "fields": ("intelligence", "strength", "speed",
                       "durability", "power", "combat")
        }),
        ("Biography", {
            "fields": ("biography",)
        }),
        ("Appearance", {
            "fields": ("appearance",)
        }),
        ("Work", {
            "fields": ("work",)
        }),
        ("Connections", {
            "fields": ("connections",)
        }),
    )


@admin.register(FavoriteHero)
class FavoriteHeroAdmin(admin.ModelAdmin):
    list_display = ("user", "hero", "created_at")
    search_fields = ("user__username", "hero__name")
    ordering = ("-created_at",)
    list_filter = ("created_at",)


@admin.register(Team)
class RecommendedTeamAdmin(admin.ModelAdmin):
    list_display = ("name", "user", "team_type", "created_at",
                    "description", "score", "status")


@admin.register(TeamHero)
class RecommendedTeamHeroAdmin(admin.ModelAdmin):
    list_display = ("team", "hero")


@admin.register(TeamGenerationJob)
class TeamGenerationJobAdmin(admin.ModelAdmin):
    list_display = ("user", "status", "error")
