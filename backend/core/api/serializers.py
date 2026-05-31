from rest_framework import serializers
from core.models import Category, Component

class LightweightComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['id', 'name', 'slug', 'description', 'created_at']

class ComponentSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Component
        fields = ['id', 'name', 'slug', 'description', 'category_name', 'created_at', 'updated_at']

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
