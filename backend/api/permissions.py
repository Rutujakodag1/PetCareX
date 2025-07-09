from rest_framework.permissions import BasePermission

class IsSeller(BasePermission):
    """
    Allows access only to users with is_seller=True.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.seller)
