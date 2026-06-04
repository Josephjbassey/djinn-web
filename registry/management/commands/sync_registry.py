import json
import os
from django.core.management.base import BaseCommand, CommandError
from django.utils.text import slugify
from django.conf import settings
from django.db import transaction
from registry.models import Category, Component, ComponentRegistry, ComponentFile

class Command(BaseCommand):
    def handle(self, *args, **options):
        registry_path = os.path.join(settings.BASE_DIR, 'registry_src', 'components')
        seen_component_slugs = set()
        seen_registry_names = set()
        if not os.path.exists(registry_path):
            self.stdout.write(f"Registry path {registry_path} not found.")
            return
        for item in os.listdir(registry_path):
            ipath = os.path.join(registry_path, item)
            if not os.path.isdir(ipath): continue
            meta_path = os.path.join(ipath, 'metadata.json')
            if not os.path.exists(meta_path): continue
            with open(meta_path, 'r') as f: meta = json.load(f)
            cname = meta.get('name', item)
            cat_name = meta.get('category', 'Uncategorized')
            category, _ = Category.objects.get_or_create(slug=slugify(cat_name), defaults={'name': cat_name})
            files_metadata = meta.get('files', [])
            template_code, logic_code, file_contents = '', '', []
            for fm in files_metadata:
                fname = fm.get('name')
                if not fname: raise CommandError(f"File missing name in {cname}")
                fpath = os.path.join(ipath, fname)
                if not os.path.exists(fpath): raise CommandError(f"File {fname} missing for {cname}")
                with open(fpath, 'r') as ff:
                    content = ff.read()
                    file_contents.append({'filename': fname, 'content': content})
                    if fname.endswith('.html'): template_code = content
                    elif fname.endswith('.py'): logic_code = content
            comp_slug = slugify(cname); reg_name = cname.lower()
            seen_component_slugs.add(comp_slug); seen_registry_names.add(reg_name)
            with transaction.atomic():
                Component.objects.update_or_create(slug=comp_slug, defaults={
                    'category': category, 'name': cname, 'description': meta.get('description', ''),
                    'version': meta.get('version', '1.0.0'), 'metadata': meta,
                    'dependencies': meta.get('dependencies', []), 'accessibility': meta.get('accessibility', {}),
                    'interaction_strategy': meta.get('interaction_strategy', 'static'),
                    'template_code': template_code, 'logic_code': logic_code,
                })
                reg_entry, _ = ComponentRegistry.objects.update_or_create(name=reg_name, defaults={
                    'category': cat_name.lower(), 'dependencies': meta.get('dependencies', []),
                })
                ComponentFile.objects.filter(component=reg_entry).delete()
                ComponentFile.objects.bulk_create([ComponentFile(component=reg_entry, filename=fc['filename'], content=fc['content']) for fc in file_contents])
        with transaction.atomic():
            Component.objects.exclude(slug__in=seen_component_slugs).delete()
            ComponentRegistry.objects.exclude(name__in=seen_registry_names).delete()
        self.stdout.write("Sync complete")
