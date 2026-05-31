from django.test import TestCase
from core.models import Category, Component

class RegistryTests(TestCase):
    def setUp(self):
        self.cat = Category.objects.create(name="Buttons", slug="buttons")
        self.comp = Component.objects.create(
            category=self.cat,
            name="Button",
            slug="button",
            template_code="<button></button>",
            logic_code="class Button: pass"
        )

    def test_component_creation(self):
        self.assertEqual(self.comp.name, "Button")
        self.assertEqual(self.comp.category.name, "Buttons")

    def test_api_list(self):
        response = self.client.get('/api/components/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
