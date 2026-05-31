from rest_framework import serializers
from .models import Category, Component, ComponentFile

class ComponentFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComponentFile
        fields = ['name', 'content', 'target_path']

class ComponentSerializer(serializers.ModelSerializer):
    files = ComponentFileSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Component
        fields = ['id', 'name', 'category', 'category_name', 'description', 'metadata', 'files']

class CategorySerializer(serializers.ModelSerializer):
    components = ComponentSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'components']
