from django_components import component

@component.register("button")
class Button(component.Component):
    template_name = "ui/button.html"

    def get_context_data(self, label, variant="primary", size="md", disabled=False, loading=False, icon=None, **kwargs):
        variants = {
            "primary": "bg-primary text-primary-foreground hover:bg-primary/90",
            "secondary": "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            "ghost": "hover:bg-accent hover:text-accent-foreground",
            "destructive": "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            "outline": "border border-input hover:bg-accent hover:text-accent-foreground"
        }
        sizes = {
            "sm": "h-9 px-3 rounded-md",
            "md": "h-10 py-2 px-4",
            "lg": "h-11 px-8 rounded-md"
        }
        return {
            "label": label,
            "variant_classes": variants.get(variant, variants["primary"]),
            "size_classes": sizes.get(size, sizes["md"]),
            "disabled": disabled,
            "loading": loading,
            "icon": icon,
            "extra_attrs": " ".join(f'{k}="{v}"' for k, v in kwargs.items())
        }
