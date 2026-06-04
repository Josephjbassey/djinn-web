from rest_framework import serializers
from registry.models import Category, Component, ComponentRegistry, ComponentFile
class ComponentFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComponentFile
        fields = ['filename', 'content']
class ComponentRegistrySerializer(serializers.ModelSerializer):
    files = ComponentFileSerializer(many=True, read_only=True)
    class Meta:
        model = ComponentRegistry
        fields = ['name', 'category', 'dependencies', 'files']
class LightweightComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['id', 'name', 'slug', 'description', 'version', 'interaction_strategy', 'created_at']
class CategorySerializer(serializers.ModelSerializer):
    components = LightweightComponentSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'components']
