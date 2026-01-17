from django.db import models
from django.utils.text import slugify

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
