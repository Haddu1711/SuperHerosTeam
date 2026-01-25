from django.db import models
from django.utils.text import slugify
from django.conf import settings

User = settings.AUTH_USER_MODEL


# Create your models here.


class SuperHero(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True)

    alignment = models.CharField(max_length=20, db_index=True)
    publisher = models.CharField(max_length=255, null=True, blank=True)
    image_url = models.URLField(null=True, blank=True)

    intelligence = models.IntegerField(default=0)
    strength = models.IntegerField(default=0)
    speed = models.IntegerField(default=0)
    durability = models.IntegerField(default=0)
    power = models.IntegerField(default=0)
    combat = models.IntegerField(default=0)

    biography = models.JSONField()
    appearance = models.JSONField()
    work = models.JSONField()
    connections = models.JSONField()

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            self.slug = f"{slugify(self.name)}-{self.id}"
        super().save(*args, **kwargs)


class FavoriteHero(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="favorite_heroes",
    )
    hero = models.ForeignKey(
        SuperHero,
        on_delete=models.CASCADE,
        related_name="favorited_by",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "hero")
        indexes = [
            models.Index(fields=["user", "hero"]),
        ]

    def __str__(self):
        return f"{self.user} → {self.hero.name}"


class Team(models.Model):
    TEAM_TYPE_CHOICES = (
        ("balanced", "Balanced"),
        ("power", "Power Based"),
        ("random", "Random"),
        ("favorites", "Favorites Based"),
    )

    STATUS_CHOICES = (
        ("draft", "Draft"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )

    STRENGTH_TYPE_CHOICES = (
        ("strong", "Strong"), ("weak", "Weak"), ("average", "Average"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="teams",
    )

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    team_type = models.CharField(max_length=20, choices=TEAM_TYPE_CHOICES)
    power_category = models.CharField(
        max_length=20, null=True, blank=True)
    team_strength = models.CharField(
        max_length=20, null=True, blank=True, choices=STRENGTH_TYPE_CHOICES)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="draft",
    )

    is_public = models.BooleanField(default=False)
    score = models.IntegerField(default=0)

    explanation = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.status})"

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = f"{self.team_type.capitalize()} Team"
        super().save(*args, **kwargs)


class TeamHero(models.Model):
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name="members",
    )
    hero = models.ForeignKey(
        SuperHero,
        on_delete=models.CASCADE,
    )

    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("team", "hero")

    def __str__(self):
        return f"{self.hero.name} → {self.team.name}"


class TeamGenerationJob(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("running", "Running"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )
    error = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Job {self.id} - {self.user} - {self.status}"
