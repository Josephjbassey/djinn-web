from rest_framework import viewsets
from .models import Category, Component
from .serializers import CategorySerializer, ComponentSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ComponentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
