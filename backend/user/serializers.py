from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'vendor']


class UserVerifySerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    otp = serializers.CharField(write_only=True)
    restore_token = serializers.CharField(read_only=True)
    status = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['otp', 'email', 'restore_token', 'status']
        read_only_fields = ['restore_token', 'status']
        write_only_fields = ['otp', 'email']
        extra_kwargs = {
            'otp': {'write_only': True},
            'email': {'write_only': True},
        }


class UserUpdatePasswordSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, write_only=True)
    otp = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ['otp', 'password', 'email']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
         write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    tokens = serializers.SerializerMethodField('get_tokens', read_only=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password', 'password2', 'tokens')

    @extend_schema_field(serializers.ListField(child=serializers.CharField()))
    def get_tokens(self, obj):
        return obj.tokens()

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        data = user.tokens()
        validated_data['access'] = data['access']

        user.save()

        return user
