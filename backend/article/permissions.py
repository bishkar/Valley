from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAccountAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and
            request.user.is_staff
        )
    

class IsUserPostAdminGet(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method not in ('GET') or
            request.user and
            request.user.is_staff
        )
