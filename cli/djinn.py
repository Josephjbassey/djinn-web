import os
import sys
import argparse
import json
import requests

# For production this would be a Vercel URL
DEFAULT_REGISTRY_URL = "http://localhost:3000/registry.json"

def init():
    """Initializes the local project for Djinn components."""
    if not os.path.exists("components/ui"):
        os.makedirs("components/ui", exist_ok=True)
        print("✓ Created components/ui directory")

    djinn_config = {
        "component_dir": "components/ui",
        "registry": DEFAULT_REGISTRY_URL
    }

    with open("djinn.json", "w") as f:
        json.dump(djinn_config, f, indent=2)
    print("✓ Created djinn.json config")

def add(component_name):
    """Adds a component from the registry to the local project."""
    if not os.path.exists("djinn.json"):
        print("Error: djinn.json not found. Run 'djinn init' first.")
        return

    with open("djinn.json", "r") as f:
        config = json.load(f)

    registry_url = config.get("registry", DEFAULT_REGISTRY_URL)

    try:
        response = requests.get(registry_url)
        response.raise_for_status()
        registry_data = response.json()

        # Search for component in all categories
        component = None
        for cat_name, components in registry_data.get('categories', {}).items():
            found = next((c for c in components if c['name'] == component_name), None)
            if found:
                component = found
                break

        if not component:
            print(f"Error: Component '{component_name}' not found in registry.")
            return

        metadata = component.get('metadata', {})
        for file_info in metadata.get('files', []):
            file_name = file_info['name']
            target_path = file_info['target']

            content = component['files'].get(file_name)
            if not content:
                print(f"Warning: Content for {file_name} not found in registry.")
                continue

            # Ensure target directory exists
            os.makedirs(os.path.dirname(target_path), exist_ok=True)

            with open(target_path, "w") as f:
                f.write(content)
            print(f"✓ Created {target_path}")

        print(f"Successfully added '{component_name}' component.")

    except Exception as e:
        print(f"Error fetching from registry: {e}")

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
