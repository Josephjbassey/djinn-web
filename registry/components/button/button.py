def get_context(variant: str = 'primary', size: str = 'md', type: str = 'button', disabled: bool = False, **kwargs) -> dict:
    """
    Returns a context dict for template rendering of the Button component.

    Args:
        variant: Visual style of the button ('primary', 'secondary', 'ghost', 'destructive', 'outline').
        size: Standard sizing tokens ('sm', 'md', 'lg').
        type: The HTML button type attribute ('button', 'submit', 'reset').
        disabled: Whether the button is interactive.
        **kwargs: Support for 'class' (extra CSS classes) and 'extra_attrs' (raw HTML attributes like ARIA).
    """
    return {
        'variant': variant,
        'size': size,
        'type': type,
        'disabled': disabled,
        'class': kwargs.get('class', ''),
        'extra_attrs': kwargs.get('extra_attrs', '')
    }
