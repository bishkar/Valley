from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView

from user.utils import *
from user.models import User

from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

RATELIMIT = '1/s'

class UserTokenRefreshView(TokenRefreshView):
    @method_decorator(ratelimit(key='ip', rate=RATELIMIT, method='POST', block=True))
    @swagger_auto_schema(operation_description="Use this endpoint to refresh the token",
                         operation_summary="Get a new Access Token using the Refresh Token")
    def post(self, request):
        return super().post(request)


class RestorePasswordView(APIView):
    @method_decorator(ratelimit(key='ip', rate=RATELIMIT, method='POST', block=True))
    @swagger_auto_schema(operation_description="Use this endpoint to restore password",
                         operation_summary="Restore password",)
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email)
        if user.exists():
            user = user.first()

            otp = generate_otp()
            
            user.otp = otp
            user.save()

            send_otp_mail(email, otp)

            return Response({'otp': "OKe"})
        return Response({'message': 'User not found'}, status=404)
