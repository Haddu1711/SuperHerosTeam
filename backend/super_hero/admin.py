from django.contrib import admin
from .models import SuperHero

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
