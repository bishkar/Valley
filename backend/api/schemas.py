from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


swagger_auth_token_response = {
        200: openapi.Schema(
            title="TokenRefresh",
            type=openapi.TYPE_OBJECT,
            properties={
                'access': openapi.Schema(type=openapi.TYPE_STRING,
                                         max_length=255),
                'refresh': openapi.Schema(type=openapi.TYPE_STRING, max_length=255)
            }
        )
    }

