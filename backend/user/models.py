from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    otp = models.CharField(max_length=1500, null=True, blank=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
