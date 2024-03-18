import random
import string
from django.core.mail import send_mail
from django.conf import settings


def generate_otp():
    return ''.join(random.choices(string.digits, k=6))


def send_otp_mail(email, otp):
    send_mail(
        'Your OTP',
        f'Your OTP is {otp}',
        settings.EMAIL_HOST_USER,
        [email], 
        fail_silently=False,
    )
