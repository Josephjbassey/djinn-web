from django.db import DatabaseError
from django.http import Http404
from rest_framework import viewsets, generics
from rest_framework.response import Response
from .serializers import CategorySerializer, ComponentRegistrySerializer
from ..models import Category, Component, ComponentRegistry

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().prefetch_related('components')
    serializer_class = CategorySerializer

class RegistryDetailView(generics.RetrieveAPIView):
    queryset = ComponentRegistry.objects.all()
    serializer_class = ComponentRegistrySerializer
    lookup_field = 'name'
    def get_object(self):
        name = self.kwargs.get('name', '').lower()
        try: return ComponentRegistry.objects.get(name=name)
        except ComponentRegistry.DoesNotExist: raise Http404(f"Component '{name}' not found")
