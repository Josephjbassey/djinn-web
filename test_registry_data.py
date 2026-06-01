import importlib.util
from pathlib import Path
import re
import sys
import types
import unittest


sys.modules.setdefault(
    "django.conf",
    types.SimpleNamespace(settings=types.SimpleNamespace(BASE_DIR=Path(__file__).parent / "backend")),
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
        self.assertEqual(normalized["details"]["1"]["template_code"], "<button></button>")
        self.assertEqual(normalized["details"]["button"]["logic_code"], "class Button: pass")


if __name__ == "__main__":
    unittest.main()
