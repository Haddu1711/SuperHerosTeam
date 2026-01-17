from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import SuperHeroListSerializer, SuperHeroDetailSerializer
from .models import SuperHero
from rest_framework.pagination import PageNumberPagination

# Create your views here.


class SuperHeroListApiView(ListAPIView):
    serializer_class = SuperHeroListSerializer
    queryset = SuperHero.objects.all().order_by("id")


class SuperHeroDetailApiView(RetrieveAPIView):
    serializer_class = SuperHeroDetailSerializer
    queryset = SuperHero.objects.all()
    lookup_field = "slug"
