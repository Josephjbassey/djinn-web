import nh3
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from registry.models import Category, Component

def sanitize_html(html):
    return nh3.clean(html)

def landing(request):
    return render(request, 'core/landing.html')

def registry_browser(request):
    categories = Category.objects.prefetch_related('components').all()
    return render(request, 'core/registry_browser.html', {'categories': categories})

def docs(request):
    return render(request, 'core/docs.html')

def workbench(request):
    component_id = request.GET.get('id')
    component = None
    if component_id:
        try: component = Component.objects.get(id=component_id)
        except Component.DoesNotExist: pass
    categories = Category.objects.prefetch_related('components').all()
    return render(request, 'core/workbench.html', {'component': component, 'categories': categories})

def preview(request):
    component = get_object_or_404(Component, id=request.GET.get('id'))
    sanitized_template = sanitize_html(component.template_code)
    html = f"""<!DOCTYPE html><html><head><title>Preview</title><style>body,html{{margin:0;padding:0;height:100%;overflow:hidden;}}iframe{{width:100%;height:100%;border:none;}}</style></head>
    <body><iframe sandbox="allow-forms allow-popups" srcdoc='<!DOCTYPE html><html><head><link rel="stylesheet" href="/static/css/output.css"></head><body>{sanitized_template}</body></html>'></iframe></body></html>"""
    response = HttpResponse(html)
    response["Content-Security-Policy"] = "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'none';"
    return response

def forge(request): return render(request, 'core/forge.html')
def sync_dashboard(request): return render(request, 'core/sync_dashboard.html')
def save_component_settings(request): return HttpResponse("Saved")
