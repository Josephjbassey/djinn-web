import json
import os
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.conf import settings
from core.models import Category, Component, ComponentRegistry, ComponentFile

class Command(BaseCommand):
    help = 'Syncs the registry/ components with the database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--registry-path',
            type=str,
            help='Path to the registry folder',
        )

    def handle(self, *args, **options):
        registry_path = options.get('registry_path') or getattr(settings, 'REGISTRY_ROOT', os.path.join(settings.BASE_DIR, '..', 'registry', 'components'))

        if not os.path.exists(registry_path):
            self.stdout.write(self.style.ERROR(f'Registry path {registry_path} does not exist'))
            return

        for component_dir in os.listdir(registry_path):
            component_path = os.path.join(registry_path, component_dir)
            if not os.path.isdir(component_path):
                continue

            metadata_file = os.path.join(component_path, 'metadata.json')
            if not os.path.exists(metadata_file):
                continue

            try:
                with open(metadata_file, 'r') as f:
                    metadata = json.load(f)
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error reading {metadata_file}: {e}'))
                continue

            component_name = metadata.get('name', component_dir)
            category_display_name = metadata.get('category', 'Uncategorized')
            category_slug = slugify(category_display_name)

            # Legacy Sync
            category, created = Category.objects.get_or_create(
                slug=category_slug,
                defaults={'name': category_display_name}
            )

            files_metadata = metadata.get('files', [])
            template_code = ''
            logic_code = ''

            file_contents = [] # To store for v1 registry

            if isinstance(files_metadata, list):
                for file_info in files_metadata:
                    fname = file_info.get('name')
                    fpath = os.path.join(component_path, fname)
                    if os.path.exists(fpath):
                        with open(fpath, 'r') as f:
                            content = f.read()
                            file_contents.append({'filename': fname, 'content': content})
                            if fname.endswith('.html'):
                                template_code = content
                            elif fname.endswith('.py'):
                                logic_code = content

            # Legacy Component Model
            Component.objects.update_or_create(
                slug=slugify(component_name),
                defaults={
                    'category': category,
                    'name': component_name.capitalize(),
                    'description': metadata.get('description', ''),
                    'version': metadata.get('version', '1.0.0'),
                    'metadata': metadata,
                    'dependencies': metadata.get('dependencies', []),
                    'accessibility': metadata.get('accessibility', {}),
                    'interaction_strategy': metadata.get('interaction_strategy', 'static'),
                    'template_code': template_code,
                    'logic_code': logic_code,
                }
            )

            # V1 Registry Model
            reg_name = component_name.lower()
            registry_entry, _ = ComponentRegistry.objects.update_or_create(
                name=reg_name,
                defaults={
                    'category': category_display_name.lower(),
                    'dependencies': metadata.get('dependencies', []),
                }
            )

            # Clear and recreate files for v1 registry
            ComponentFile.objects.filter(component=registry_entry).delete()
            for fc in file_contents:
                ComponentFile.objects.create(
                    component=registry_entry,
                    filename=fc['filename'],
                    content=fc['content']
                )

            self.stdout.write(self.style.SUCCESS(f'Synced component: {component_name} in {category.name} (Legacy & V1)'))
