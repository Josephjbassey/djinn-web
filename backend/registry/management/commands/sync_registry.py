import os
import json
from django.core.management.base import BaseCommand
from registry.models import Category, Component, ComponentFile

class Command(BaseCommand):
    help = 'Syncs the registry from the registry/ directory'

    def handle(self, *args, **options):
        registry_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))), 'registry')
        components_dir = os.path.join(registry_path, 'components')

        if not os.path.exists(components_dir):
            self.stdout.write(self.style.ERROR(f'Components directory not found at {components_dir}'))
            return

        for component_name in os.listdir(components_dir):
            comp_path = os.path.join(components_dir, component_name)
            metadata_file = os.path.join(comp_path, 'metadata.json')

            if not os.path.isfile(metadata_file):
                continue

            with open(metadata_file, 'r') as f:
                metadata = json.load(f)

            category_name = metadata.get('category', 'Uncategorized')
            category, _ = Category.objects.get_or_create(name=category_name)

            component, created = Component.objects.update_or_create(
                name=metadata['name'],
                defaults={
                    'category': category,
                    'description': metadata.get('description', ''),
                    'metadata': metadata
                }
            )

            # Clear existing files for this component
            component.files.all().delete()

            for file_info in metadata.get('files', []):
                file_name = file_info['name']
                file_path = os.path.join(comp_path, file_name)

                if os.path.exists(file_path):
                    with open(file_path, 'r') as f:
                        content = f.read()

                    ComponentFile.objects.create(
                        component=component,
                        name=file_name,
                        content=content,
                        target_path=file_info['target']
                    )

            self.stdout.write(self.style.SUCCESS(f'Synced component: {component.name}'))
