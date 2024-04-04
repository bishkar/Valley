from django.shortcuts import render
from django.utils import timezone
from django.utils.decorators import method_decorator
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.decorators import api_view, schema
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from api.schemas import swagger_auth_token_response, swagger_password_restore_request, swagger_register_token_response
from user.models import User
from user.schemas import swagger_reset_password_confirm_response
from user.serializers import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer, \
    UserUpdatePasswordSerializer, UserVerifySerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from user.utils import send_otp_mail, generate_otp
import uuid


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    throttle_scope = 'email_auth'

    @swagger_auto_schema(responses=swagger_register_token_response,
                         operation_description="Use this endpoint to register and authenticate via email",
                         operation_summary="Sign up new user using email", request_body=RegisterSerializer)
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

    @swagger_auto_schema(responses=swagger_auth_token_response,
                         operation_description="Use this endpoint to authenticate via email",
                         operation_summary="Authenticate using email (sign in/sign up)",
                         request_body=MyTokenObtainPairSerializer)
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# region Reset-password
# region Documentation
@method_decorator(
    name="get",
    decorator=swagger_auto_schema(
        responses={
            200: openapi.Schema(
                title="PasswordResetConfirm",
                type=openapi.TYPE_OBJECT,
                properties={
                    'status': openapi.Schema(type=openapi.TYPE_STRING, max_length=255)
                }
            ),
            404: openapi.Schema(
                title="PasswordResetError",
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(type=openapi.TYPE_STRING, max_length=255, description="User not found")
                },
            ),
        },
        operation_description="Use this endpoint to request a password reset",
        operation_summary="Request a password reset",
    ),
)
# endregion fo
class PasswordResetRequestView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserUpdatePasswordSerializer
    throttle_scope = 'password_reset_request'

    def retrieve(self, request, *args, **kwargs):
        email = self.kwargs.get('email')
        user = User.objects.get(email=email)

        if user:
            otp = generate_otp()

            user.otp = otp
            user.otp_expiry = timezone.now() + timezone.timedelta(minutes=10)

            user.save()
            send_otp_mail(email, otp)

            return Response({'message': 'OTP sent to your email'}, status=status.HTTP_200_OK)

        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


# region Documentation
@method_decorator(
    name="put",
    decorator=swagger_auto_schema(
        responses={
            200: openapi.Schema(
                title="PasswordResetConfirm",
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(type=openapi.TYPE_STRING, max_length=255)
                }
            ),
            406: openapi.Schema(
                title="PasswordResetError",
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(type=openapi.TYPE_STRING, max_length=255, description="Invalid OTP")
                },
            ),
        },
        operation_description="Use this endpoint to confirm a password reset",
        operation_summary="Confirm a password reset using OTP",
    ),
)
# endregion
class PasswordResetConfirmView(generics.UpdateAPIView):
    serializer_class = UserUpdatePasswordSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'email'
    throttle_scope = 'password_reset_confirm'

    def update(self, request, *args, **kwargs):
        user = User.objects.get(email=request.data.get('email'))
        print(user.email)
        restore_token = self.kwargs.get('restore_token')
        print(restore_token)
        if (user.restore_token and user.restore_token == restore_token and user.otp_expiry > timezone.now()):
            user.restore_token = None

            user.set_password(request.data.get('password'))
            user.save()

            return Response({'status': 'Success', 'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'Failed', 'message': 'Invalid restore_token'},
                            status=status.HTTP_406_NOT_ACCEPTABLE)

    # region Documentation
    @swagger_auto_schema(deprecated=True)
    # endregion
    def patch(self, request, *args, **kwargs):
        pass


class CheckOTPView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserVerifySerializer
    permission_classes = (AllowAny,)

    # search_fields = ['otp', 'email']

    def retrieve(self, request, *args, **kwargs):
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
