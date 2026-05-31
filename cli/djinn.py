import argparse
import os
import requests
import sys

DEFAULT_BASE_URL = "http://localhost:8000/api"


def get_api_url(args):
    return args.api_url or os.environ.get("DJINN_API_URL", DEFAULT_BASE_URL)


def api_url_for(api_url, path):
    return f"{api_url.rstrip('/')}/{path.lstrip('/')}"


def fetch_component_detail(component_summary, api_url):
    component_url = api_url_for(api_url, f"components/{component_summary['id']}/")
    response = requests.get(component_url, timeout=10)
    response.raise_for_status()
    return response.json()


def add_component(component_slug, api_url, with_logic=True):
    print(f"⠋ Fetching {component_slug} from registry...")
    try:
        response = requests.get(api_url_for(api_url, "components/"), timeout=10)
        response.raise_for_status()
        components = response.json()

        component_summary = next(
            (c for c in components if c['slug'] == component_slug),
            None,
        )
        if not component_summary:
            print(f"✖ Component '{component_slug}' not found in registry.")
            sys.exit(1)

        component = fetch_component_detail(component_summary, api_url)

        # Ensure directory exists
        os.makedirs("components/ui", exist_ok=True)

        # Write template
        template_path = f"components/ui/{component_slug}.html"
        with open(template_path, "w") as f:
            f.write(component['template_code'])
        print(f"✔ Created {template_path}")

        # Write logic if requested
        if with_logic:
            # Defensive check for logic_code
            if component.get('logic_code'):
                logic_path = f"components/ui/{component_slug}.py"
                with open(logic_path, "w") as f:
                    f.write(component['logic_code'])
                print(f"✔ Created {logic_path}")
            else:
                print(f"ℹ Skipping logic file for {component_slug} (none provided).")

        print(f"\n✔ Component {component_slug} successfully installed.")

    except requests.exceptions.RequestException as e:
        print(f"✖ Network/Request Error: {str(e)}")
        sys.exit(1)
    except OSError as e:
        print(f"✖ File Error: {str(e)}")
        sys.exit(1)
    except Exception as e:
        print(f"✖ Unexpected Error: {str(e)}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Djinn CLI - Own your Django components")
    parser.add_argument("--api-url", help="Override the default Djinn API URL")
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
    api_url = get_api_url(args)

    if args.command == "add":
        add_component(args.component, api_url, not args.no_logic)
    elif args.command in ["update", "diff"]:
        print(f"ℹ Command '{args.command}' is not fully implemented in this preview.")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
