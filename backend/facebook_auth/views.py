from django.shortcuts import render
from drf_spectacular.utils import extend_schema
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from api.schemas import swagger_auth_token_response
from facebook_auth.serializers import FacebookAuthSerializers


class FacebookApiView(GenericAPIView):
    serializer_class = FacebookAuthSerializers
    throttle_scope = 'facebook_auth'

    @extend_schema(
        responses=swagger_auth_token_response,
        description="Use this endpoint to authenticate via Facebook",
        summary="Authenticate using Facebook (sign in/sign up)",
    )
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
