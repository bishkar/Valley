from django.shortcuts import render
from django.utils import timezone
from django.utils.decorators import method_decorator
from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework import generics, status
from rest_framework.decorators import api_view, schema
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from user.models import User
from user.serializers import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer, \
    UserUpdatePasswordSerializer, UserVerifySerializer, StatusSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from user.utils import send_otp_mail, generate_otp
import uuid
from django.utils.translation import gettext as _


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    throttle_scope = 'email_auth'

    @extend_schema(
        description="Register a new user",
        summary="Register a new user",
        responses=RegisterSerializer
    )
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        user = User.objects.get(email=request.data['email'])
        token = MyTokenObtainPairSerializer.get_token(user)

        response.data = {
            "access": str(token.access_token),
            "refresh": str(token),
            "first_name": request.data['first_name'],
            "last_name": request.data['last_name'],
            "email": request.data['email']
        }
        return response


class EmailTokenObtainPairView(TokenObtainPairView):
    throttle_scope = 'email_token_auth'

    # @extend_schema(description="Use this endpoint to authenticate via email",
    #                summary="Authenticate using email (sign in/sign up)",
    #                responses=swagger_auth_token_response)
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# region Reset-password

class PasswordResetRequestView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserUpdatePasswordSerializer
    throttle_scope = 'password_reset_request'

    @extend_schema(
        description="Use this endpoint to request a password reset",
        responses={200: StatusSerializer()},
        summary="Request password reset")
    def get(self, request, *args, **kwargs):
        email = self.kwargs.get('email')
        user = User.objects.get(email=email)

        if user and not user.provider == 'email':
            otp = generate_otp()

            user.otp = otp
            user.otp_expiry = timezone.now() + timezone.timedelta(minutes=10)

            user.save()
            send_otp_mail(email, otp)

            return Response({'status': 'success', 'message': _('OTP sent to your email')}, status=status.HTTP_200_OK)

        return Response({'status': 'failed', 'message': _('User not found')}, status=status.HTTP_404_NOT_FOUND)


class PasswordResetConfirmView(generics.UpdateAPIView):
    serializer_class = UserUpdatePasswordSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'email'
    throttle_scope = 'password_reset_confirm'
    http_method_names = ['put']

    @extend_schema(
        description="Use this endpoint two update password",
        responses=StatusSerializer(),
        summary="Update password using restore_token",
    )
    def put(self, request, *args, **kwargs):
        user = User.objects.get(email=request.data.get('email'))
        print(user.email)
        restore_token = request.data.get('restore_token')
        if (user.restore_token and user.restore_token == restore_token and user.otp_expiry > timezone.now()):
            user.restore_token = None

            user.set_password(request.data.get('password'))
            user.save()

            return Response({'status': 'Success', 'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'Failed', 'message': 'Invalid restore_token'},
                            status=status.HTTP_406_NOT_ACCEPTABLE)


class CheckOTPView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserVerifySerializer
    permission_classes = (AllowAny,)

    # search_fields = ['otp', 'email']

    @extend_schema(
        description="Check OTP",
        summary="Check OTP",
        responses=UserVerifySerializer
    )
    def get(self, request, *args, **kwargs):
        user = User.objects.get(email=kwargs.get('email'))
        print(kwargs.get('otp'))
        if user.otp == kwargs.get('otp') and user.otp_expiry > timezone.now():
            user.otp = None
            user.restore_token = uuid.uuid4()
            user.otp_expiry = timezone.now() + timezone.timedelta(minutes=30)
            user.save()
            return Response({'status': 'success', "restore_token": user.restore_token}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'Failed', 'message': "OTP is not valid or expired"},
                            status=status.HTTP_406_NOT_ACCEPTABLE)
