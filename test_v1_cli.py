import requests
import subprocess
import os
import shutil

def test():
    print("Checking if server is running...")
    try:
        requests.get("http://localhost:8000/api/v1/registry/button/", timeout=5)
    except requests.exceptions.RequestException as e:
        print(f"✖ Error: Server not running or unreachable: {e}")
        return
    except KeyboardInterrupt:
        raise

    print("Running CLI list...")
    res = subprocess.run(["python3", "cli/djinn.py", "list"], capture_output=True, text=True)
    if res.returncode != 0:
        print(f"✖ CLI list failed:\n{res.stderr}")
        return
    print(res.stdout)

    print("Running CLI add button...")
    res = subprocess.run(["python3", "cli/djinn.py", "add", "button"], capture_output=True, text=True)
    if res.returncode != 0:
        print(f"✖ CLI add failed:\n{res.stderr}")
        return
    print(res.stdout)

    if os.path.exists("components/ui/button.html"):
        print("✔ Verification successful: button.html created")
        os.remove("components/ui/button.html")
        if os.path.exists("components/ui/button.py"):
            os.remove("components/ui/button.py")
        # Cleanup empty dirs
        try:
            os.removedirs("components/ui")
        except OSError:
            pass
    else:
        print("✖ Verification failed: button.html not found")

if __name__ == "__main__":
    test()
