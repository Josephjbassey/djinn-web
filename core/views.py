from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template import Template, Context
from registry.models import Category, Component
def landing(request): return render(request, 'core/landing.html')
def registry_browser(request): return render(request, 'core/registry_browser.html', {'categories': Category.objects.all()})
def docs(request): return render(request, 'core/docs.html')
def workbench(request):
    cid = request.GET.get('id')
    comp = Component.objects.filter(id=cid).first() if cid else None
    return render(request, 'core/workbench.html', {'component': comp, 'categories': Category.objects.all()})
def preview(request):
    comp = get_object_or_404(Component, id=request.GET.get('id'))
    return HttpResponse("<html><head><link rel='stylesheet' href='/static/css/output.css'></head><body>"+comp.template_code+"</body></html>")
def forge(request): return render(request, 'core/forge.html')
def sync_dashboard(request): return render(request, 'core/sync_dashboard.html')
def save_component_settings(request): return HttpResponse("Saved")
