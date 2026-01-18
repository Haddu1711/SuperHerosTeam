from django.urls import path
from super_hero.views import SuperHeroListApiView, SuperHeroDetailApiView, UserFavSuperHerosListApiView, FavSuperHeroApiView

urlpatterns = [
    path("", SuperHeroListApiView.as_view(), name="hero-list"),
    path("<slug:slug>/", SuperHeroDetailApiView.as_view(), name="hero-detail"),

    # Favorites Actions
    path(
        "<int:hero_id>/favorite/",
        FavSuperHeroApiView.as_view(),
        name="hero-user-favorite",
    ),
    path(
        "favorites/all/",
        UserFavSuperHerosListApiView.as_view(),
        name="user-favorites-list",
    ),
]
