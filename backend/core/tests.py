import os
import json
import tempfile
import shutil
from django.test import TestCase
from django.core.management import call_command
from core.models import Category, Component, ComponentRegistry, ComponentFile

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

        self.reg = ComponentRegistry.objects.create(
            name="button",
            category="buttons",
            dependencies=["tailwindcss"]
        )
        ComponentFile.objects.create(
            component=self.reg,
            filename="button.html",
            content="<button></button>"
        )

    def test_component_creation(self):
        self.assertEqual(self.comp.name, "Button")
        self.assertEqual(self.comp.category.name, "Buttons")

    def test_api_detail(self):
        response = self.client.get('/api/v1/registry/button/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['name'], 'button')
        self.assertEqual(len(data['files']), 1)

    def test_sync_registry_command(self):
        temp_dir = tempfile.mkdtemp()
        try:
            comp_dir = os.path.join(temp_dir, 'card')
            os.makedirs(comp_dir)

            metadata = {
                "name": "card",
                "category": "Layout",
                "description": "A simple card",
                "files": [{"name": "card.html"}, {"name": "card.py"}]
            }
            with open(os.path.join(comp_dir, 'metadata.json'), 'w', encoding='utf-8') as f:
                json.dump(metadata, f)

            with open(os.path.join(comp_dir, 'card.html'), 'w', encoding='utf-8') as f:
                f.write("<div class='card'></div>")
            with open(os.path.join(comp_dir, 'card.py'), 'w', encoding='utf-8') as f:
                f.write("class Card: pass")

            call_command('sync_registry', registry_path=temp_dir)

            self.assertTrue(Category.objects.filter(slug='layout').exists())
            card = Component.objects.get(slug='card')
            self.assertEqual(card.name, 'Card')
            self.assertEqual(card.template_code, "<div class='card'></div>")

            self.assertTrue(ComponentRegistry.objects.filter(name='card').exists())
            self.assertEqual(ComponentFile.objects.filter(component__name='card').count(), 2)
            self.assertTrue(ComponentFile.objects.filter(component__name='card', filename='card.html').exists())

            with open(os.path.join(comp_dir, 'card.html'), 'w', encoding='utf-8') as f:
                f.write("<div class='updated-card'></div>")

            call_command('sync_registry', registry_path=temp_dir)
            card.refresh_from_db()
            self.assertEqual(card.template_code, "<div class='updated-card'></div>")
            self.assertEqual(ComponentFile.objects.get(component__name='card', filename='card.html').content, "<div class='updated-card'></div>")

        finally:
            shutil.rmtree(temp_dir)
