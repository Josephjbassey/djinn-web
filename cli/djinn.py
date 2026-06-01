import argparse
import os
import requests
import sys
import json

DEFAULT_BASE_URL = "http://localhost:8000/api"

def get_api_url(args):
    return args.api_url or os.environ.get("DJINN_API_URL", DEFAULT_BASE_URL)

def api_url_for(api_url, path):
    return f"{api_url.rstrip('/')}/{path.lstrip('/')}"

def fetch_component_detail(component_id, api_url):
    component_url = api_url_for(api_url, f"components/{component_id}/")
    response = requests.get(component_url, timeout=10)
    response.raise_for_status()
    return response.json()

def install_component(component, with_logic=True, target_dir="components/ui"):
    os.makedirs(target_dir, exist_ok=True)

    # Write template
    template_path = os.path.join(target_dir, f"{component['slug']}.html")
    with open(template_path, "w") as f:
        f.write(component['template_code'])
    print(f"  ✔ Created {template_path}")

    # Write logic
    if with_logic and component.get('logic_code'):
        logic_path = os.path.join(target_dir, f"{component['slug']}.py")
        with open(logic_path, "w") as f:
            f.write(component['logic_code'])
        print(f"  ✔ Created {logic_path}")

    return True

def add_component(component_slug, api_url, with_logic=True, force=False):
    print(f"⠋ Fetching {component_slug} from registry...")
    try:
        # First try the V1 Registry API
        v1_url = api_url_for(api_url, f"v1/registry/{component_slug}/")
        try:
            response = requests.get(v1_url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                print(f"ℹ Using Registry V1 API for {component_slug}")
                os.makedirs("components/ui", exist_ok=True)
                for file in data.get('files', []):
                    fpath = os.path.join("components/ui", file['filename'])
                    with open(fpath, "w") as f:
                        f.write(file['content'])
                    print(f"  ✔ Created {fpath}")
                print(f"\n✔ Component {component_slug} successfully installed.")
                return
        except:
            pass

        # Fallback to standard components API
        response = requests.get(api_url_for(api_url, "components/"), timeout=10)
        response.raise_for_status()
        components = response.json()

        component_summary = next((c for c in components if c['slug'] == component_slug), None)
        if not component_summary:
            print(f"✖ Component '{component_slug}' not found in registry.")
            sys.exit(1)

        component = fetch_component_detail(component_summary['id'], api_url)
        install_component(component, with_logic)
        print(f"\n✔ Component {component_slug} successfully installed.")

    except Exception as e:
        print(f"✖ Error: {str(e)}")
        sys.exit(1)

def list_components(api_url):
    print("⠋ Fetching registry...")
    try:
        response = requests.get(api_url_for(api_url, "categories/"))
        response.raise_for_status()
        categories = response.json()

        print("\nDjinn Component Registry:")
        for cat in categories:
            print(f"\n[{cat['name']}]")
            for comp in cat['components']:
                print(f"  - {comp['slug']}")
    except Exception as e:
        print(f"✖ Error: {str(e)}")

def main():
    parser = argparse.ArgumentParser(description="Djinn CLI - Own your Django components")
    parser.add_argument("--api-url", help="Override the default Djinn API URL")
    subparsers = parser.add_subparsers(dest="command")

    # Add
    add_parser = subparsers.add_parser("add", help="Add a component")
    add_parser.add_argument("component", help="Slug of the component")
    add_parser.add_argument("--no-logic", action="store_true", help="Skip python logic")

    # List
    subparsers.add_parser("list", help="List components")

    # Update
    subparsers.add_parser("update", help="Update component")
    diff_parser = subparsers.add_parser("diff", help="Diff component")
    diff_parser.add_argument("component")

    args = parser.parse_args()
    api_url = get_api_url(args)

    if args.command == "add":
        add_component(args.component, api_url, not args.no_logic)
    elif args.command == "list":
        list_components(api_url)
    elif args.command in ["update", "diff"]:
        print(f"ℹ Command '{args.command}' is not fully implemented in this preview.")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
