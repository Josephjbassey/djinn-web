from django_components import Component, register
@register("hero")
class Hero(Component):
    template_name = "hero/hero.html"
    def get_context_data(self, badge, title_line1, title_line2, description):
        return {"badge": badge, "title_line1": title_line1, "title_line2": title_line2, "description": description}
