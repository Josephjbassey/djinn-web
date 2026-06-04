from django_components import Component, register
@register("card")
class Card(Component):
    template_name = "card/card.html"
    def get_context_data(self, title, description, icon):
        return {"title": title, "description": description, "icon": icon}
