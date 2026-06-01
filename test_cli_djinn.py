import importlib.util
import os
from pathlib import Path
import sys
import tempfile
import types
import unittest
from unittest.mock import patch


sys.modules.setdefault(
    "requests",
    types.SimpleNamespace(
        exceptions=types.SimpleNamespace(RequestException=Exception),
        get=None,
    ),
)

DJINN_PATH = Path(__file__).parent / "cli" / "djinn.py"
spec = importlib.util.spec_from_file_location("djinn_cli", DJINN_PATH)
djinn = importlib.util.module_from_spec(spec)
spec.loader.exec_module(djinn)


class MockResponse:
    def __init__(self, payload):
        self.payload = payload

    def raise_for_status(self):
        pass

    def json(self):
        return self.payload


class AddComponentTests(unittest.TestCase):
    def test_add_component_fetches_detail_before_writing_code(self):
        requests = [
            MockResponse([
                {
                    "id": 7,
                    "name": "Button",
                    "slug": "button",
                    "description": "A button",
                }
            ]),
            MockResponse(
                {
                    "id": 7,
                    "name": "Button",
                    "slug": "button",
                    "description": "A button",
                    "template_code": "<button></button>",
                    "logic_code": "class Button: pass",
                }
            ),
        ]

        with tempfile.TemporaryDirectory() as temp_dir:
            original_cwd = os.getcwd()
            os.chdir(temp_dir)
            try:
                with patch.object(djinn.requests, "get", side_effect=requests) as get:
                    djinn.add_component(
                        "button",
                        "http://registry.test/api/",
                        with_logic=True,
                    )
            finally:
                os.chdir(original_cwd)

            self.assertEqual(
                [call.args[0] for call in get.call_args_list],
                [
                    "http://registry.test/api/components/",
                    "http://registry.test/api/components/7/",
                ],
            )
            self.assertEqual(
                Path(temp_dir, "components/ui/button.html").read_text(),
                "<button></button>",
            )
            self.assertEqual(
                Path(temp_dir, "components/ui/button.py").read_text(),
                "class Button: pass",
            )


if __name__ == "__main__":
    unittest.main()
