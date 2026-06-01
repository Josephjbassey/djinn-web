from django.db import DatabaseError
from django.http import Http404
from rest_framework import viewsets, generics
from rest_framework.response import Response

from core.api.serializers import (
    CategorySerializer,
    ComponentDetailSerializer,
    ComponentSerializer,
    ComponentRegistrySerializer
)
from core.models import Category, Component, ComponentRegistry
from core.registry_data import load_registry_components


class RegistryFallbackMixin:
    fallback_key = None

    def list_with_fallback(self, request, *args, **kwargs):
        try:
            response = super().list(request, *args, **kwargs)
            if response.data:
                return response
        except DatabaseError:
            pass

        return Response(load_registry_components()[self.fallback_key])


class CategoryViewSet(RegistryFallbackMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().prefetch_related('components')
    serializer_class = CategorySerializer
    fallback_key = "categories"

    def list(self, request, *args, **kwargs):
        return self.list_with_fallback(request, *args, **kwargs)


class ComponentViewSet(RegistryFallbackMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Component.objects.all().select_related('category')
    fallback_key = "components"

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ComponentDetailSerializer
        return ComponentSerializer

    def list(self, request, *args, **kwargs):
        return self.list_with_fallback(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except (DatabaseError, Http404):
            component = load_registry_components()["details"].get(kwargs.get(self.lookup_field))
            if component is None:
                raise Http404
            return Response(component)

class RegistryDetailView(generics.RetrieveAPIView):
    queryset = ComponentRegistry.objects.all()
    serializer_class = ComponentRegistrySerializer
    lookup_field = 'name'

    def get_object(self):
        name = self.kwargs.get('name', '').lower()
        try:
            return ComponentRegistry.objects.get(name=name)
        except ComponentRegistry.DoesNotExist as e:
            raise Http404(f"Component '{name}' not found in registry.") from e
