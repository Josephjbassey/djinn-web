# Button component logic
def get_context(variant='primary', size='md', disabled=False, **kwargs):
    return {
        'variant': variant,
        'size': size,
        'disabled': disabled,
        'class': kwargs.get('class', ''),
        'extra_attrs': kwargs.get('extra_attrs', '')
    }
