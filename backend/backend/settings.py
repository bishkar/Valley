"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 5.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""
from datetime import timedelta
from pathlib import Path
import environs
from datetime import timedelta

env = environs.Env()
env.read_env()

FACEBOOK_APP_ID = env.str("FACEBOOK_APP_ID")
FACEBOOK_SECRET_KEY = env.str("FACEBOOK_SECRET_KEY")
FACEBOOK_CALLBACK_URL = env.str("FACEBOOK_CALLBACK_URL")

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-y-npw7(ya$!0l&v0+^f9qwjygi#^4z$)zi0fu#v&pafx_f86&^'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1"]

# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Custom Apps
    'user',
    'api',
    'facebook_auth',
    'favourite',
    'article',
    'translation',
    'grading',

    # Third Party Apps
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    # 'drf_yasg',
    'drf_spectacular_sidecar',
    'drf_spectacular',
    'django_filters'
]

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=50),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}
# SWAGGER_SETTINGS: dict[str, any] = {
#     'OPERATIONS_SORTER': 'method',
# }

SPECTACULAR_SETTINGS = {
    'TITLE': 'Valley',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SWAGGER_UI_DIST': 'SIDECAR',  # shorthand to use the sidecar instead
    'SWAGGER_UI_FAVICON_HREF': 'SIDECAR',
    'REDOC_DIST': 'SIDECAR',
    'SCHEMA_PATH_PREFIX': '/api/v[0-9]',
    'SERVE_AUTHENTICATION': ["rest_framework.authentication.SessionAuthentication"],
}

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    # 'DEFAULT_RENDERER_CLASSES': (
    #     'rest_framework.renderers.JSONRenderer',
    # ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        
    ),
    'DEFAULT_THROTTLE_RATES': {
        'refresh_token': '5/h',
        'article': '5/m',
        'facebook_auth': '5/m',
        'favourite': '100/m',
        'email_auth': '5/m',
        'email_token_auth': '5/m',
        'password_reset_request': '20/d',
        'password_reset_confirm': '10/d',
    }
}


CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5173",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
CORS_ALLOW_ALL_ORIGINS = True
AUTH_USER_MODEL = 'user.User'
ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432',

    }
}
# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "TOKEN_OBTAIN_SERIALIZER": "api.serializers.CustomTokenObtainPairSerializer",
}

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

EMAIL_BACKEND = env.str("EMAIL_BACKEND")
EMAIL_HOST = env.str("EMAIL_HOST")
EMAIL_PORT = env.str("EMAIL_PORT")
EMAIL_USE_TLS = env.str("EMAIL_USE_TLS")
EMAIL_HOST_USER = env.str("EMAIL_HOST_USER") 
EMAIL_HOST_PASSWORD = env.str("EMAIL_HOST_PASSWORD") 

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'
