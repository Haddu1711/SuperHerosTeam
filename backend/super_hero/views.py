from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from super_hero.models import (FavoriteHero, SuperHero, Team,
                               TeamGenerationJob, TeamHero)
from super_hero.serializers import (SuperHeroDetailSerializer,
                                    SuperHeroListSerializer,
                                    TeamDetailSerializer, TeamSerializer,
                                    UserFavSuperHeroListSerializer)
from super_hero.tasks import generate_recommended_teams

# Create your views here.


class SuperHeroListApiView(ListAPIView):
    serializer_class = SuperHeroListSerializer
    queryset = SuperHero.objects.all().order_by("id")


class SuperHeroDetailApiView(RetrieveAPIView):
    serializer_class = SuperHeroDetailSerializer
    queryset = SuperHero.objects.all()
    lookup_field = "slug"


class UserFavSuperHerosListApiView(ListAPIView):
    serializer_class = UserFavSuperHeroListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            SuperHero.objects
            .filter(favorited_by__user=self.request.user)
            .distinct().order_by("id")
        )


class FavSuperHeroApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, hero_id):
        is_favorite = FavoriteHero.objects.filter(
            user=request.user,
            hero_id=hero_id,
        ).exists()

        return Response(
            {"is_favorite": is_favorite},
            status=status.HTTP_200_OK,
        )

    def post(self, request, hero_id):
        hero = get_object_or_404(SuperHero, id=hero_id)

        fav, created = FavoriteHero.objects.get_or_create(
            user=request.user,
            hero=hero,
        )

        return Response(
            {"is_favorite": True},
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )

    def delete(self, request, hero_id):
        FavoriteHero.objects.filter(
            user=request.user,
            hero_id=hero_id,
        ).delete()

        return Response(
            {"is_favorite": False},
            status=status.HTTP_204_NO_CONTENT,
        )


class TriggerTeamRecommendationApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        job = TeamGenerationJob.objects.create(
            user=request.user
        )

        generate_recommended_teams.delay(job.id)

        return Response(
            {
                "job_id": job.id,
                "status": job.status,
            },
            status=status.HTTP_202_ACCEPTED,
        )


class TeamRecommendationStatusApiView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = TeamGenerationJob.objects.all()

    def retrieve(self, request, *args, **kwargs):
        job = self.get_object()

        if job.user != request.user:
            return Response(
                {"detail": "Forbidden"},
                status=status.HTTP_403_FORBIDDEN,
            )

        return Response(
            {
                "status": job.status,
                "error": job.error,
            }, status=status.HTTP_200_OK
        )


class UserTeamsListApiView(ListAPIView):
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = Team.objects.filter(
            user=self.request.user).order_by("-updated_at")

        status_q = self.request.query_params.get("status", "draft")

        if status_q:
            qs = qs.filter(status=status_q)

        return qs.prefetch_related("members__hero")


class TeamDetailApiView(RetrieveAPIView):
    serializer_class = TeamDetailSerializer
    queryset = Team.objects.prefetch_related("members__hero")


class TeamUpdateApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, team_id):
        action = request.data.get("action")
        name = request.data.get("name")
        description = request.data.get("description")
        explanation = request.data.get("explanation")

        print("action:", action)

        team = Team.objects.get(id=team_id, user=request.user)

        if action == "approved":
            team.status = action
            if name and type(name) == str:
                team.name = name
            if description and type(name) == str:
                team.description = description
            if explanation and type(name) == str:
                team.explanation = explanation
        elif action == "rejected":
            team.status = action
        else:
            return Response(
                {"detail": "Invalid action"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        team.save()
        return Response(TeamSerializer(team).data)
