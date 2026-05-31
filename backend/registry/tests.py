from django.test import TestCase
from .models import Category, Component

class RegistryModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Buttons")
        self.component = Component.objects.create(
            name="button",
            category=self.category,
            description="A test button"
        )

    def test_component_creation(self):
        self.assertEqual(self.component.name, "button")
        self.assertEqual(self.component.category.name, "Buttons")

    def test_api_list(self):
        response = self.client.get('/api/components/')
        self.assertEqual(response.status_code, 200)
