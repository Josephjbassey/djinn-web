from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Component(models.Model):
    name = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='components')
    description = models.TextField(blank=True)
    metadata = models.JSONField(default=dict)

    def __str__(self):
        return self.name

class ComponentFile(models.Model):
    component = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='files')
    name = models.CharField(max_length=255)
    content = models.TextField()
    target_path = models.CharField(max_length=512)

    def __str__(self):
        return f"{self.component.name} - {self.name}"
