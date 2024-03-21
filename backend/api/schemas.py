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


swagger_password_restore_request = {
    200: openapi.Schema(
        title="PasswordResetRequest",
        type=openapi.TYPE_OBJECT,
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING, max_length=255)
        }
    )
}

swagger_register_token_response = {
        201 : openapi.Schema(
            title="RegisterObtainPair",
            type=openapi.TYPE_OBJECT,
            properties={
                'access': openapi.Schema(type=openapi.TYPE_STRING,
                                         max_length=255),
                'refresh': openapi.Schema(type=openapi.TYPE_STRING, max_length=255),
                'first_name' : openapi.Schema(type=openapi.TYPE_STRING,
                                         max_length=150),
                'last_name' : openapi.Schema(type=openapi.TYPE_STRING,
                                         max_length=150),
                'email' : openapi.Schema(type=openapi.TYPE_STRING,
                                         max_length=255),
            }
        ),
}

