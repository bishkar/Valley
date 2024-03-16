from drf_yasg import openapi

swagger_reset_password_confirm_response = {
    200: openapi.Schema(
        title="PasswordResetConfirm",
        type=openapi.TYPE_OBJECT,
        properties={
            'status': openapi.Schema(type=openapi.TYPE_STRING, max_length=255)
        }
    )
}

