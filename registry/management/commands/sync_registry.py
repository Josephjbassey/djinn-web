import json
import os
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.conf import settings
from django.db import transaction
from registry.models import Category, Component, ComponentRegistry, ComponentFile

class Command(BaseCommand):
    def handle(self, *args, **options):
        registry_path = os.path.join(settings.BASE_DIR, 'registry_src', 'components')
        for item in os.listdir(registry_path):
            ipath = os.path.join(registry_path, item)
            if not os.path.isdir(ipath): continue
            meta_path = os.path.join(ipath, 'metadata.json')
            if not os.path.exists(meta_path): continue
            with open(meta_path, 'r') as f: meta = json.load(f)
            cname = meta.get('name', item)
            cat_name = meta.get('category', 'Uncategorized')
            category, _ = Category.objects.get_or_create(slug=slugify(cat_name), defaults={'name': cat_name})
            files = []
            template_code, logic_code = '', ''
            for fm in meta.get('files', []):
                fname = fm.get('name')
                fpath = os.path.join(ipath, fname)
                if os.path.exists(fpath):
                    with open(fpath, 'r') as ff:
                        content = ff.read()
                        files.append({'filename': fname, 'content': content})
                        if fname.endswith('.html'): template_code = content
                        elif fname.endswith('.py'): logic_code = content
            with transaction.atomic():
                Component.objects.update_or_create(slug=slugify(cname), defaults={
                    'category': category, 'name': cname.capitalize(), 'description': meta.get('description', ''),
                    'template_code': template_code, 'logic_code': logic_code, 'metadata': meta
                })
                reg, _ = ComponentRegistry.objects.update_or_create(name=cname.lower(), defaults={'category': cat_name.lower()})
                ComponentFile.objects.filter(component=reg).delete()
                ComponentFile.objects.bulk_create([ComponentFile(component=reg, filename=f['filename'], content=f['content']) for f in files])
        self.stdout.write("Sync complete")
