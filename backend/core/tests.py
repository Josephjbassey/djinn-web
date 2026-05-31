import os
import json
import tempfile
import shutil
from django.test import TestCase
from django.core.management import call_command
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
        # We now use a list of components, and the Lightweight serializer
        self.assertEqual(len(response.json()), 1)

    def test_sync_registry_command(self):
        # Create a temporary registry directory
        temp_dir = tempfile.mkdtemp()
        try:
            # Create category dir
            cat_dir = os.path.join(temp_dir, 'layout')
            os.makedirs(cat_dir)

            # Create component dir
            comp_dir = os.path.join(cat_dir, 'card')
            os.makedirs(comp_dir)

            # Create metadata.json
            metadata = {
                "name": "card",
                "description": "A simple card",
                "files": {
                    "template": "card.html",
                    "logic": "card.py"
                }
            }
            with open(os.path.join(comp_dir, 'metadata.json'), 'w') as f:
                json.dump(metadata, f)

            # Create template and logic files
            with open(os.path.join(comp_dir, 'card.html'), 'w') as f:
                f.write("<div class='card'></div>")
            with open(os.path.join(comp_dir, 'card.py'), 'w') as f:
                f.write("class Card: pass")

            # Run the command
            call_command('sync_registry', registry_path=temp_dir)

            # Verify database objects
            self.assertTrue(Category.objects.filter(slug='layout').exists())
            card = Component.objects.get(slug='card')
            self.assertEqual(card.name, 'Card')
            self.assertEqual(card.template_code, "<div class='card'></div>")
            self.assertEqual(card.logic_code, "class Card: pass")

            # Test update semantics
            with open(os.path.join(comp_dir, 'card.html'), 'w') as f:
                f.write("<div class='updated-card'></div>")

            call_command('sync_registry', registry_path=temp_dir)
            card.refresh_from_db()
            self.assertEqual(card.template_code, "<div class='updated-card'></div>")

        finally:
            shutil.rmtree(temp_dir)
