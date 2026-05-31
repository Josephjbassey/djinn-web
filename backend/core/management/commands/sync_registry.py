import json
import os
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.conf import settings
from core.models import Category, Component

class Command(BaseCommand):
    help = 'Syncs the registry/ folder with the database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--registry-path',
            type=str,
            help='Path to the registry folder',
        )

    def handle(self, *args, **options):
        registry_path = options.get('registry_path') or getattr(settings, 'REGISTRY_ROOT', '/app/registry')

        if not os.path.exists(registry_path):
            self.stdout.write(self.style.ERROR(f'Registry path {registry_path} does not exist'))
            return

        for category_name in os.listdir(registry_path):
            category_path = os.path.join(registry_path, category_name)
            if not os.path.isdir(category_path):
                continue

            category, _ = Category.objects.get_or_create(
                name=category_name.capitalize(),
                slug=slugify(category_name)
            )

            for component_name in os.listdir(category_path):
                component_path = os.path.join(category_path, component_name)
                if not os.path.isdir(component_path):
                    continue

                metadata_file = os.path.join(component_path, 'metadata.json')
                if not os.path.exists(metadata_file):
                    continue

                with open(metadata_file, 'r') as f:
                    metadata = json.load(f)

                files_metadata = metadata.get('files', {})
                template_file_name = None
                logic_file_name = None

                if isinstance(files_metadata, dict):
                    template_file_name = files_metadata.get('template')
                    logic_file_name = files_metadata.get('logic')
                elif isinstance(files_metadata, list):
                    # Handle legacy list format
                    for f_meta in files_metadata:
                        name = f_meta.get('name', '')
                        if name.endswith('.html'):
                            template_file_name = name
                        elif name.endswith('.py'):
                            logic_file_name = name

                template_code = ''
                if template_file_name:
                    template_file = os.path.join(component_path, template_file_name)
                    if os.path.exists(template_file):
                        with open(template_file, 'r') as f:
                            template_code = f.read()

                logic_code = ''
                if logic_file_name:
                    logic_file = os.path.join(component_path, logic_file_name)
                    if os.path.exists(logic_file):
                        with open(logic_file, 'r') as f:
                            logic_code = f.read()

                Component.objects.update_or_create(
                    slug=slugify(component_name),
                    defaults={
                        'category': category,
                        'name': component_name.capitalize(),
                        'description': metadata.get('description', ''),
                        'metadata': metadata,
                        'template_code': template_code,
                        'logic_code': logic_code,
                    }
                )
                self.stdout.write(self.style.SUCCESS(f'Synced component: {component_name}'))
