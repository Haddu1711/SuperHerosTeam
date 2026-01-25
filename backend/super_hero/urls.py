from django.urls import path
from super_hero.views import (FavSuperHeroApiView, SuperHeroDetailApiView,
                              SuperHeroListApiView, TeamDetailApiView,
                              TeamRecommendationStatusApiView,
                              TeamUpdateApiView,
                              TriggerTeamRecommendationApiView,
                              UserFavSuperHerosListApiView,
                              UserTeamsListApiView)

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

    # Super Heros Recommendation Teams Generation
    path(
        "teams/create-recommend/",
        TriggerTeamRecommendationApiView.as_view(),
        name="team-create-recommend",
    ),
    path(
        "teams/recommend/status/<int:pk>/",
        TeamRecommendationStatusApiView.as_view(),
        name="team-recommend-status",
    ),
    path("teams/all/", UserTeamsListApiView.as_view(), name="team-list"),
    path("teams/detail/<int:pk>/", TeamDetailApiView.as_view(), name="team-detail"),
    path(
        "teams/<int:team_id>/update/",
        TeamUpdateApiView.as_view(),
        name="team-update",
    ),
]
