from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

PROVIDER_CHOICES = (
    ('facebook', 'facebook'),
    ('email', 'email')
)


class User(AbstractUser):
    otp = models.CharField(max_length=1500, null=True, blank=True)
    email = models.EmailField(unique=True)
    provider = models.CharField(max_length=10, choices=PROVIDER_CHOICES, default='email')
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        access = AccessToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(access)
        }

    @staticmethod
    def get_or_create_social_user(provider, email, name, password):
        get_user_by_email = User.objects.filter(email=email)
        if get_user_by_email.exists():
            if get_user_by_email.provider == provider:
                return get_user_by_email
            else:
                raise AuthenticationFailed('Please continue your login using ' + get_user_by_email.provider)

        name = name.split(" ")
        first_name = name[0]
        second_name = name[1]

        user = User.objects.create(email=email, first_name=first_name, last_name=second_name, provider=provider)
        user.set_password(password)
        user.save()
        return user
