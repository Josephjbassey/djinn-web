from rest_framework import serializers
from core.models import Category, Component

class ComponentSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Component
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    components = ComponentSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = '__all__'
