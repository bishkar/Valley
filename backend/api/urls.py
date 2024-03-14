from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from user.views import RegisterView
from api.views import secure_view

schema_view = get_schema_view(
    openapi.Info(
        title="Valley Backend APIs",
        default_version='v1.0.0',
        terms_of_service="https://www.google.com/policies/terms/"
    ),
    public=True,
    permission_classes=[permissions.AllowAny, ],
)

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterView.as_view(), name="register_view"),
    path("test/", secure_view),
]
