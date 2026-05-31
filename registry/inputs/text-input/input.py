from django_components import component

@component.register("text-input")
class TextInput(component.Component):
    template_name = "ui/input.html"
    def get_context_data(self, placeholder="Type here...", variant="default", **kwargs):
        return {
            "placeholder": placeholder,
            "variant": variant,
            "is_error": variant == "error",
            **kwargs
        }
