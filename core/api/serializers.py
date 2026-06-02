from rest_framework import serializers
from core.models import Category, Component, ComponentRegistry, ComponentFile

class LightweightComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['id', 'name', 'slug', 'description', 'version', 'interaction_strategy', 'created_at']

class ComponentSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Component
        fields = [
            'id', 'name', 'slug', 'description', 'version',
            'category_name', 'interaction_strategy', 'created_at', 'updated_at'
        ]

class ComponentDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Component
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    components = LightweightComponentSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'components']

class ComponentFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComponentFile
        fields = ['filename', 'content']

class ComponentRegistrySerializer(serializers.ModelSerializer):
    files = ComponentFileSerializer(many=True, read_only=True)
    class Meta:
        model = ComponentRegistry
        fields = ['name', 'category', 'dependencies', 'files']
