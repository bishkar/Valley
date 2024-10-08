from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView

from user.models import User
from user.views import EmailTokenObtainPairView
from django.utils.translation import gettext as _


class CustomEmailTokenObtainView(EmailTokenObtainPairView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()

        if not user or user.provider != 'email':
            return Response({'error': _('Something went wrong')}, status=status.HTTP_400_BAD_REQUEST)

        return super().post(request, *args, **kwargs)


class UserTokenRefreshView(TokenRefreshView):
    throttle_scope = 'refresh_token'

    @extend_schema(
        description="Use this endpoint to refresh the token",
        summary="Get a new Access Token using the Refresh Token",
        responses=TokenRefreshView
    )
    def post(self, request):
        return super().post(request)
