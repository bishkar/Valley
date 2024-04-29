from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from facebook_auth.serializers import FacebookAuthSerializers


class FacebookApiView(GenericAPIView):
    serializer_class = FacebookAuthSerializers
    throttle_scope = 'facebook_auth'

    # @extend_schema(
    #     responses=swagger_auth_token_response,
    #     description="Use this endpoint to authenticate via Facebook",
    #     summary="Authenticate using Facebook (sign in/sign up)",
    # )
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
