import argparse
import os
import requests
import sys
import json

BASE_URL = "http://localhost:8000/api"

def add_component(component_slug, with_logic=True):
    print(f"⠋ Fetching {component_slug} from registry...")
    try:
        response = requests.get(f"{BASE_URL}/components/")
        response.raise_for_status()
        components = response.json()

        component = next((c for c in components if c['slug'] == component_slug), None)
        if not component:
            print(f"✖ Component '{component_slug}' not found in registry.")
            return

        # Ensure directory exists
        os.makedirs("components/ui", exist_ok=True)

        # Write template
        template_path = f"components/ui/{component_slug}.html"
        with open(template_path, "w") as f:
            f.write(component['template_code'])
        print(f"✔ Created {template_path}")

        # Write logic if requested
        if with_logic:
            logic_path = f"components/ui/{component_slug}.py"
            with open(logic_path, "w") as f:
                f.write(component['logic_code'])
            print(f"✔ Created {logic_path}")

        print(f"\n✔ Component {component_slug} successfully installed.")

    except Exception as e:
        print(f"✖ Error: {str(e)}")

def main():
    parser = argparse.ArgumentParser(description="Djinn CLI - Own your Django components")
    subparsers = parser.add_subparsers(dest="command")

    # Add command
    add_parser = subparsers.add_parser("add", help="Add a component to your project")
    add_parser.add_argument("component", help="Slug of the component to add")
    add_parser.add_argument("--no-logic", action="store_true", help="Skip python logic file")

    # Update command (mock)
    update_parser = subparsers.add_parser("update", help="Update an existing component")
    update_parser.add_argument("component", help="Slug of the component to update")

    # Diff command (mock)
    diff_parser = subparsers.add_parser("diff", help="Diff local component with registry")
    diff_parser.add_argument("component", help="Slug of the component to diff")

    args = parser.parse_args()

    if args.command == "add":
        add_component(args.component, not args.no_logic)
    elif args.command in ["update", "diff"]:
        print(f"ℹ Command '{args.command}' is not fully implemented in this preview.")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
