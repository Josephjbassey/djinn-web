from rest_framework import viewsets, generics
from registry.models import Category, Component, ComponentRegistry
from .serializers import CategorySerializer, ComponentRegistrySerializer
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all(); serializer_class = CategorySerializer
class RegistryDetailView(generics.RetrieveAPIView):
    queryset = ComponentRegistry.objects.all(); serializer_class = ComponentRegistrySerializer; lookup_field = 'name'
