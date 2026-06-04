from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template import Template, Context
from django.utils.html import escape
from registry.models import Category, Component
import bleach

def sanitize_html(html):
    """Sanitize HTML to allow only safe tags and attributes."""
    allowed_tags = ['div', 'span', 'p', 'a', 'button', 'input', 'label', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'br', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td']
    allowed_attrs = {
        '*': ['class', 'id'],
        'a': ['href', 'title'],
        'button': ['type'],
        'input': ['type', 'name', 'value', 'placeholder'],
    }
    return bleach.clean(html, tags=allowed_tags, attributes=allowed_attrs, strip=True)

def landing(request): return render(request, 'core/landing.html')
def registry_browser(request): return render(request, 'core/registry_browser.html', {'categories': Category.objects.all()})
def docs(request): return render(request, 'core/docs.html')
def workbench(request):
    cid = request.GET.get('id')
    comp = Component.objects.filter(id=cid).first() if cid else None
    return render(request, 'core/workbench.html', {'component': comp, 'categories': Category.objects.all().prefetch_related('components')})
def preview(request):
    comp = get_object_or_404(Component, id=request.GET.get('id'))
    sanitized_template = sanitize_html(comp.template_code)
    iframe_content = f'<iframe sandbox="allow-forms allow-popups" srcdoc="{escape(sanitized_template)}" style="width:100%;height:100vh;border:none;"></iframe>'
    html_content = f"<html><head><link rel='stylesheet' href='/static/css/output.css'></head><body>{iframe_content}</body></html>"
    response = HttpResponse(html_content)
    response['Content-Security-Policy'] = "default-src 'self'; style-src 'self' 'unsafe-inline'; frame-src 'self'"
    return response
def forge(request): return render(request, 'core/forge.html')
def sync_dashboard(request): return render(request, 'core/sync_dashboard.html')
def save_component_settings(request): return HttpResponse("Saved")
