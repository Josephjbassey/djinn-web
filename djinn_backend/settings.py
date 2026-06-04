import os
from pathlib import Path
import dj_database_url
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.environ.get("SECRET_KEY")
if not SECRET_KEY and not os.environ.get("DJANGO_DEVELOPMENT"):
    raise RuntimeError("SECRET_KEY required in production.")
SECRET_KEY = SECRET_KEY or "django-insecure-monolith-key"
DEBUG = os.environ.get("DJANGO_DEBUG", "False").lower() == "true"
ALLOWED_HOSTS = [h.strip() for h in os.environ.get("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",") if h.strip()]
INSTALLED_APPS = [
    'django.contrib.admin', 'django.contrib.auth', 'django.contrib.contenttypes', 'django.contrib.sessions',
    'django.contrib.messages', 'django.contrib.staticfiles', 'rest_framework', 'corsheaders',
    'django_components', 'django_htmx', 'django_browser_reload', 'registry', 'core',
]
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware', 'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware', 'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware', 'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware', 'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_htmx.middleware.HtmxMiddleware', 'django_browser_reload.middleware.BrowserReloadMiddleware',
]
ROOT_URLCONF = 'djinn_backend.urls'
TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates', 'DIRS': [BASE_DIR / 'templates'], 'APP_DIRS': False,
    'OPTIONS': {
        'context_processors': [
            'django.template.context_processors.request', 'django.contrib.auth.context_processors.auth',
            'django.contrib.messages.context_processors.messages', 'django_components.context_processors.django_components',
        ],
        'loaders': [('django.template.loaders.cached.Loader', [
            'django.template.loaders.filesystem.Loader', 'django.template.loaders.app_directories.Loader', 'django_components.template_loader.Loader',
        ])],
    },
}]
WSGI_APPLICATION = 'djinn_backend.wsgi.application'
DATABASES = {'default': dj_database_url.config(default=f'sqlite:///{BASE_DIR / "db.sqlite3"}')}
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']
CORS_ALLOW_ALL_ORIGINS = os.environ.get("CORS_ALLOW_ALL_ORIGINS", "False").lower() == "true"
REGISTRY_ROOT = os.path.join(BASE_DIR, 'registry_src', 'components')
COMPONENTS = {"libraries": ["core.components"]}
