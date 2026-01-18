from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import SuperHeroListSerializer, SuperHeroDetailSerializer, UserFavSuperHeroListSerializer
from .models import SuperHero, FavoriteHero
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

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
