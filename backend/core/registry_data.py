import json
import os
from functools import lru_cache
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen

from django.conf import settings
from django.utils.text import slugify


DEFAULT_REGISTRY_API_URL = (
    "https://api.github.com/repos/josephjbassey/djinn/contents/"
    "registry/components?ref=main"
)
REQUEST_TIMEOUT = 10

REGISTRY_CANDIDATES = [
    Path(settings.BASE_DIR).parent / "frontend" / "public" / "registry.json",
    Path(settings.BASE_DIR) / "public" / "registry.json",
    Path(__file__).with_name("registry.json"),
]


@lru_cache(maxsize=1)
def load_registry_components():
    remote_registry = load_remote_registry_components()
    if remote_registry["components"]:
        return remote_registry

    for registry_path in REGISTRY_CANDIDATES:
        if registry_path.exists():
            with registry_path.open() as registry_file:
                registry = json.load(registry_file)
            return normalize_registry(registry)
    return empty_registry()


def load_remote_registry_components():
    registry_url = os.environ.get("DJINN_REGISTRY_API_URL", DEFAULT_REGISTRY_API_URL)
    if not registry_url:
        return empty_registry()

    try:
        component_dirs = fetch_json(registry_url)
        components = []
        for component_dir in component_dirs:
            component = load_remote_component_safely(component_dir)
            if component:
                components.append(component)
        return normalize_component_records(components)
    except (TypeError, ValueError, URLError, TimeoutError, OSError):
        return empty_registry()


def load_remote_component_safely(component_dir):
    if component_dir.get("type") != "dir":
        return None

    try:
        return load_remote_component(component_dir["url"])
    except (KeyError, TypeError, ValueError, URLError, TimeoutError, OSError):
        return None


def load_remote_component(component_url):
    files = fetch_json(component_url)
    file_map = {
        file_info["name"]: file_info
        for file_info in files
        if file_info.get("type") == "file"
    }
    metadata_info = file_map.get("registry.json")
    if not metadata_info:
        return None

    metadata = fetch_json(metadata_info["download_url"])
    template_name = metadata.get("files", {}).get("template")
    python_name = (
        metadata.get("files", {}).get("python")
        or metadata.get("files", {}).get("logic")
    )

    return {
        "metadata": metadata,
        "template_code": fetch_text_file(file_map, template_name),
        "logic_code": fetch_text_file(file_map, python_name),
    }


def fetch_json(url):
    with urlopen(build_request(url), timeout=REQUEST_TIMEOUT) as response:
        return json.load(response)


def fetch_text_file(file_map, file_name):
    if not file_name or file_name not in file_map:
        return ""

    with urlopen(
        build_request(file_map[file_name]["download_url"]),
        timeout=REQUEST_TIMEOUT,
    ) as response:
        return response.read().decode("utf-8")


def build_request(url):
    return Request(url, headers={"User-Agent": "djinn-web-registry-loader"})


def normalize_component_records(component_records):
    grouped_components = {}
    for record in component_records:
        metadata = record.get("metadata", {})
        category_name = metadata.get("category") or "Components"
        grouped_components.setdefault(category_name, []).append(record)

    categories = []
    components = []
    details = {}
    component_id = 1

    for category_id, category_name in enumerate(sorted(grouped_components), start=1):
        category = {
            "id": category_id,
            "name": category_name,
            "slug": slugify(category_name),
            "components": [],
        }

        for record in sorted(
            grouped_components[category_name],
            key=lambda item: item["metadata"].get("name", ""),
        ):
            metadata = record.get("metadata", {})
            slug = slugify(metadata.get("name", ""))
            summary = component_summary(component_id, metadata)
            list_summary = {
                **summary,
                "category_name": category_name,
                "updated_at": None,
            }
            detail = {
                **list_summary,
                "category": category_id,
                "metadata": metadata,
                "template_code": record.get("template_code", ""),
                "logic_code": record.get("logic_code", ""),
            }

            category["components"].append(summary)
            components.append(list_summary)
            details[str(component_id)] = detail
            details[slug] = detail
            component_id += 1

        categories.append(category)

    return {"categories": categories, "components": components, "details": details}


def normalize_registry(registry):
    component_records = []
    for category_name, category_components in registry.get("categories", {}).items():
        for component in category_components:
            metadata = {
                **component.get("metadata", {}),
                "name": component.get(
                    "name",
                    component.get("metadata", {}).get("name", ""),
                ),
                "category": component.get("metadata", {}).get("category", category_name),
                "description": component.get(
                    "description",
                    component.get("metadata", {}).get("description", ""),
                ),
            }
            component_records.append(
                {
                    "metadata": metadata,
                    "template_code": first_file_with_suffix(component, ".html"),
                    "logic_code": first_file_with_suffix(component, ".py"),
                }
            )
    return normalize_component_records(component_records)


def component_summary(component_id, metadata):
    name = metadata.get("name", "")
    return {
        "id": component_id,
        "name": name.capitalize(),
        "slug": slugify(name),
        "description": metadata.get("description", ""),
        "created_at": None,
    }


def first_file_with_suffix(component, suffix):
    for file_name, file_contents in component.get("files", {}).items():
        if file_name.endswith(suffix):
            return file_contents
    return ""


def empty_registry():
    return {"categories": [], "components": [], "details": {}}
