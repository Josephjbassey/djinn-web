from django_components import Component, register
@register("button")
class Button(Component):
    template_name = "button/button.html"
