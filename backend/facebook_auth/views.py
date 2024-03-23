from django.shortcuts import render
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from api.schemas import swagger_auth_token_response
from facebook_auth.serializers import FacebookAuthSerializers

from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

RATELIMIT = '1/s'

class FacebookApiView(GenericAPIView):
    serializer_class = FacebookAuthSerializers

    @method_decorator(ratelimit(key='ip', rate=RATELIMIT, method='POST', block=True))
    @swagger_auto_schema(responses=swagger_auth_token_response,
                         operation_description="Use this endpoint to authenticate via Facebook",
                         operation_summary="Authenticate using Facebook (sign in/sign up)",)
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
