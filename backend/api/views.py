from drf_spectacular.utils import extend_schema_field, extend_schema
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView

from user.utils import *
from user.models import User


class UserTokenRefreshView(TokenRefreshView):
    throttle_scope = 'refresh_token'

    @extend_schema(
        description="Use this endpoint to refresh the token",
        summary="Get a new Access Token using the Refresh Token",
        responses=TokenRefreshView
    )
    def post(self, request):
        return super().post(request)
