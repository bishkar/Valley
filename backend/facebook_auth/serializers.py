from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from user.models import User
from facebook_auth.utils import Facebook


class FacebookAuthSerializers(serializers.Serializer):
    auth_token = serializers.CharField()

    @staticmethod
    def validate_auth_token(auth_token: str):
        profile = Facebook.validate(auth_token)
        if profile:
            name = profile.get('name')
            email = profile.get('email')

            try:
                user = User.get_or_create_social_user('facebook', email, name, auth_token)
                return user.tokens()

            except AuthenticationFailed as e:
                raise serializers.ValidationError(e.detail)
