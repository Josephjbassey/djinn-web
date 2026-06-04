from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    class Meta:
        verbose_name_plural = "Categories"
    def __str__(self):
        return self.name

class Component(models.Model):
    INTERACTION_CHOICES = [('static', 'Static'), ('htmx', 'HTMX'), ('alpine', 'Alpine.js'), ('vanilla', 'Vanilla JS')]
    category = models.ForeignKey(Category, related_name='components', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    version = models.CharField(max_length=20, default="1.0.0")
    metadata = models.JSONField(default=dict, blank=True)
    dependencies = models.JSONField(default=list, blank=True)
    accessibility = models.JSONField(default=dict, blank=True)
    interaction_strategy = models.CharField(max_length=20, choices=INTERACTION_CHOICES, default='static')
    template_code = models.TextField(blank=True)
    logic_code = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.category.name} / {self.name}"

class ComponentRegistry(models.Model):
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=100)
    dependencies = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "Component Registries"
    def __str__(self):
        return self.name

class ComponentFile(models.Model):
    component = models.ForeignKey(ComponentRegistry, related_name="files", on_delete=models.CASCADE)
    filename = models.CharField(max_length=255)
    content = models.TextField()
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['component', 'filename'], name='unique_component_filename')
        ]
    def __str__(self):
        return f"{self.component.name} / {self.filename}"

class Theme(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    tokens = models.JSONField(default=dict)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name
