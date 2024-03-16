import random


def generate_otp(length: int = 7):
    otp = ''.join([str(random.randint(0, 9)) for _ in range(length)])
    return otp
