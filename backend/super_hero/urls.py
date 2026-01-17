from django.urls import path
from super_hero.views import SuperHeroListApiView, SuperHeroDetailApiView

urlpatterns = [
    path("", SuperHeroListApiView.as_view(), name="hero-list"),
    path("<slug:slug>/", SuperHeroDetailApiView.as_view(), name="hero-detail")
]
