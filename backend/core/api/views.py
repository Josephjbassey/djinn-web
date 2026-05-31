from rest_framework import viewsets
from core.models import Category, Component
from core.api.serializers import CategorySerializer, ComponentSerializer, ComponentDetailSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().prefetch_related('components')
    serializer_class = CategorySerializer

class ComponentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Component.objects.all().select_related('category')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ComponentDetailSerializer
        return ComponentSerializer
