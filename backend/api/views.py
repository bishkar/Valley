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

    @swagger_auto_schema(operation_description="Use this endpoint to refresh the token",
                         operation_summary="Get a new Access Token using the Refresh Token")
    def post(self, request):
        return super().post(request)
