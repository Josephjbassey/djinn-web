import json
from functools import lru_cache
from pathlib import Path

from django.conf import settings
from django.utils.text import slugify


REGISTRY_CANDIDATES = [
    Path(settings.BASE_DIR).parent / "frontend" / "public" / "registry.json",
    Path(settings.BASE_DIR) / "public" / "registry.json",
    Path(__file__).with_name("registry.json"),
]


@lru_cache(maxsize=1)
def load_registry_components():
    for registry_path in REGISTRY_CANDIDATES:
        if registry_path.exists():
            with registry_path.open() as registry_file:
                registry = json.load(registry_file)
            return normalize_registry(registry)
    return {"categories": [], "components": [], "details": {}}


def normalize_registry(registry):
    categories = []
    components = []
    details = {}
    component_id = 1

    for category_id, (category_name, category_components) in enumerate(
        registry.get("categories", {}).items(),
        start=1,
    ):
        category = {
            "id": category_id,
            "name": category_name,
            "slug": slugify(category_name),
            "components": [],
        }

        for component in category_components:
            slug = slugify(component.get("name", ""))
            summary = {
                "id": component_id,
                "name": component.get("name", "").capitalize(),
                "slug": slug,
                "description": component.get("description", ""),
                "created_at": None,
            }
            list_summary = {
                **summary,
                "category_name": category_name,
                "updated_at": None,
            }
            detail = {
                **list_summary,
                "category": category_id,
                "metadata": component.get("metadata", {}),
                "template_code": first_file_with_suffix(component, ".html"),
                "logic_code": first_file_with_suffix(component, ".py"),
            }

            category["components"].append(summary)
            components.append(list_summary)
            details[str(component_id)] = detail
            details[slug] = detail
            component_id += 1

        categories.append(category)

    return {"categories": categories, "components": components, "details": details}


def first_file_with_suffix(component, suffix):
    for file_name, file_contents in component.get("files", {}).items():
        if file_name.endswith(suffix):
            return file_contents
    return ""
