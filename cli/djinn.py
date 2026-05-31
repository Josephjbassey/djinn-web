import os
import sys
import argparse
import json
import requests

API_BASE_URL = "http://localhost:8000/api"

def init():
    """Initializes the local project for Djinn components."""
    if not os.path.exists("components/ui"):
        os.makedirs("components/ui", exist_ok=True)
        print("✓ Created components/ui directory")

    djinn_config = {
        "component_dir": "components/ui",
        "registry": API_BASE_URL
    }

    with open("djinn.json", "w") as f:
        json.dump(djinn_config, f, indent=2)
    print("✓ Created djinn.json config")

def add(component_name):
    """Adds a component from the registry to the local project."""
    if not os.path.exists("djinn.json"):
        print("Error: djinn.json not found. Run 'djinn init' first.")
        return

    try:
        response = requests.get(f"{API_BASE_URL}/components/")
        response.raise_for_status()
        components = response.data if hasattr(response, 'data') else response.json()

        # In case it's DRF paginated or list
        if isinstance(components, dict) and 'results' in components:
            components = components['results']

        component = next((c for c in components if c['name'] == component_name), None)

        if not component:
            print(f"Error: Component '{component_name}' not found in registry.")
            return

        for file_info in component['files']:
            target_path = file_info['target_path']
            # Ensure target directory exists
            os.makedirs(os.path.dirname(target_path), exist_ok=True)

            with open(target_path, "w") as f:
                f.write(file_info['content'])
            print(f"✓ Created {target_path}")

        print(f"Successfully added '{component_name}' component.")

    except Exception as e:
        print(f"Error fetching component: {e}")

def main():
    parser = argparse.ArgumentParser(description="Djinn CLI - Django Component Manager")
    subparsers = parser.add_subparsers(dest="command")

    # Init command
    subparsers.add_parser("init", help="Initialize Djinn in the current project")

    # Add command
    add_parser = subparsers.add_parser("add", help="Add a component from the registry")
    add_parser.add_argument("component", help="Name of the component to add")

    args = parser.parse_args()

    if args.command == "init":
        init()
    elif args.command == "add":
        add(args.component)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
