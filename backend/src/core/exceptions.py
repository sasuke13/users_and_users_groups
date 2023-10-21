from rest_framework.exceptions import ValidationError


class InstanceDoesNotExist(ValidationError):
    def __init__(self, message, *args, **kwargs):
        super().__init__(message, *args, **kwargs)


class InstanceAlreadyExists(ValidationError):
    def __init__(self, message, *args, **kwargs):
        super().__init__(message, *args, **kwargs)


class DeletingForbiddenException(ValidationError):
    def __init__(self, message, *args, **kwargs):
        super().__init__(message, *args, **kwargs)
