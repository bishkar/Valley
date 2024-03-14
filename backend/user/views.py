from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.permissions import AllowAny

from api.schemas import swagger_auth_token_response
from user.models import User
from user.serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class EmailTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(responses=swagger_auth_token_response,
                         operation_description="Use this endpoint to authenticate via email")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
