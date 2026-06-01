import subprocess
import os
import requests
import time

def test_cli_v1():
    # Ensure server is running
    try:
        requests.get("http://localhost:8000/api/v1/registry/button/")
    except:
        print("Server not running. Please start it.")
        return

    # Run CLI
    env = os.environ.copy()
    env["DJINN_API_URL"] = "http://localhost:8000/api"

    print("Testing 'djinn list'...")
    subprocess.run(["python3", "cli/djinn.py", "list"], env=env)

    print("\nTesting 'djinn add button'...")
    subprocess.run(["python3", "cli/djinn.py", "add", "button"], env=env)

    if os.path.exists("components/ui/button.html"):
        print("\nSUCCESS: button.html created")
    else:
        print("\nFAILURE: button.html missing")

if __name__ == "__main__":
    test_cli_v1()
