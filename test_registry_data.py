import importlib.util
from pathlib import Path
import re
import sys
import types
import unittest
from unittest.mock import patch


sys.modules.setdefault(
    "django.conf",
    types.SimpleNamespace(
        settings=types.SimpleNamespace(BASE_DIR=Path(__file__).parent / "backend"),
    ),
)
sys.modules.setdefault("django", types.SimpleNamespace())
sys.modules.setdefault("django.utils", types.SimpleNamespace())
sys.modules.setdefault(
    "django.utils.text",
    types.SimpleNamespace(
        slugify=lambda value: re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    ),
)

REGISTRY_DATA_PATH = Path(__file__).parent / "backend" / "core" / "registry_data.py"
spec = importlib.util.spec_from_file_location("registry_data", REGISTRY_DATA_PATH)
registry_data = importlib.util.module_from_spec(spec)
spec.loader.exec_module(registry_data)


class RegistryDataTests(unittest.TestCase):
    def test_normalize_registry_matches_api_response_shape(self):
        normalized = registry_data.normalize_registry(
            {
                "categories": {
                    "Buttons": [
                        {
                            "name": "button",
                            "description": "A button",
                            "metadata": {"variants": ["primary"]},
                            "files": {
                                "button.html": "<button></button>",
                                "button.py": "class Button: pass",
                            },
                        }
                    ]
                }
            }
        )

        self.assertEqual(
            normalized["categories"],
            [
                {
                    "id": 1,
                    "name": "Buttons",
                    "slug": "buttons",
                    "components": [
                        {
                            "id": 1,
                            "name": "Button",
                            "slug": "button",
                            "description": "A button",
                            "created_at": None,
                        }
                    ],
                }
            ],
        )
        self.assertEqual(normalized["components"][0]["category_name"], "Buttons")
        self.assertEqual(
            normalized["details"]["1"]["template_code"],
            "<button></button>",
        )
        self.assertEqual(
            normalized["details"]["button"]["logic_code"],
            "class Button: pass",
        )

    def test_normalize_component_records_uses_djinn_registry_metadata(self):
        normalized = registry_data.normalize_component_records(
            [
                {
                    "metadata": {
                        "name": "alert-dialog",
                        "version": "1.0.0",
                        "category": "Overlays",
                        "description": "Confirm a destructive action.",
                        "files": {
                            "template": "alert-dialog.html",
                            "python": "alert-dialog.py",
                        },
                        "variants": ["default"],
                    },
                    "template_code": "<dialog>{{ title }}</dialog>",
                    "logic_code": "def get_context(): return {}",
                }
            ]
        )

        self.assertEqual(normalized["categories"][0]["name"], "Overlays")
        self.assertEqual(normalized["components"][0]["slug"], "alert-dialog")
        self.assertEqual(normalized["details"]["1"]["metadata"]["version"], "1.0.0")
        self.assertEqual(
            normalized["details"]["alert-dialog"]["template_code"],
            "<dialog>{{ title }}</dialog>",
        )

    def test_load_remote_component_reads_djinn_registry_files(self):
        responses = {
            "https://api.test/components/button": [
                {
                    "name": "registry.json",
                    "type": "file",
                    "download_url": "https://raw.test/button/registry.json",
                },
                {
                    "name": "button.html",
                    "type": "file",
                    "download_url": "https://raw.test/button/button.html",
                },
                {
                    "name": "button.py",
                    "type": "file",
                    "download_url": "https://raw.test/button/button.py",
                },
            ],
            "https://raw.test/button/registry.json": {
                "name": "button",
                "category": "Buttons",
                "files": {"template": "button.html", "python": "button.py"},
            },
        }

        def fetch_json(url):
            return responses[url]

        def fetch_text_file(file_map, file_name):
            return f"contents of {file_name}"

        with patch.object(
            registry_data,
            "fetch_json",
            side_effect=fetch_json,
        ), patch.object(
            registry_data,
            "fetch_text_file",
            side_effect=fetch_text_file,
        ):
            component = registry_data.load_remote_component(
                "https://api.test/components/button"
            )

        self.assertEqual(component["metadata"]["name"], "button")
        self.assertEqual(component["template_code"], "contents of button.html")
        self.assertEqual(component["logic_code"], "contents of button.py")


if __name__ == "__main__":
    unittest.main()
