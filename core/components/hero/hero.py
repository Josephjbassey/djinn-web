from django_components import Component, register
@register("hero")
class Hero(Component):
    template_name = "hero/hero.html"
    def get_context_data(self, **kwargs): return kwargs
