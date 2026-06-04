from django.test import TestCase
from registry.models import Category, ComponentRegistry

class RegistryAPITestCase(TestCase):
    def setUp(self):
        self.cat = Category.objects.create(name="Layout", slug="layout")
        self.reg = ComponentRegistry.objects.create(name="button", category="buttons", dependencies=[])

    def test_registry_v1_category_list(self):
        response = self.client.get('/api/categories/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertTrue(any(c['name'] == 'Layout' for c in data))

    def test_registry_v1_detail(self):
        response = self.client.get('/api/v1/registry/button/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['name'], 'button')

    def test_registry_v1_not_found(self):
        response = self.client.get('/api/v1/registry/unknown/')
        self.assertEqual(response.status_code, 404)
