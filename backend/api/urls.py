from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.routers import DefaultRouter, SimpleRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api.views import UserTokenRefreshView
from article.views import ArticleViewSet, SliderViewSet 
from favourite.views import FavouriteViewSet
from facebook_auth.views import FacebookApiView
from user.views import RegisterView, EmailTokenObtainPairView, PasswordResetRequestView, PasswordResetConfirmView
# from api.views import secure_view


schema_view = get_schema_view(
    openapi.Info(
        title="Valley Backend APIs",
        default_version='v1.0.0',
        terms_of_service="https://www.google.com/policies/terms/"
    ),
    public=True,
    permission_classes=[permissions.AllowAny, ],
)

router = SimpleRouter()
router.register(r'articles', ArticleViewSet, basename='articles')
router.register('slider', SliderViewSet, basename='slider')

urlpatterns = [
    path("token/email/", EmailTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", UserTokenRefreshView.as_view(), name="token_refresh"),
    path("token/facebook/", include('facebook_auth.urls')),

    path("register/", RegisterView.as_view(), name="register_view"),

    # reset password
    path("reset-password/request/<str:email>/", PasswordResetRequestView.as_view(), name="password_reset_request"),
    path("reset-password/confirm/", PasswordResetConfirmView.as_view(), name="password_change"),

    # favourite
    path("favourites/", FavouriteViewSet.as_view(), name="favourites"),

    # # swagger json
    # path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),

]

urlpatterns += router.urls

# debug
urlpatterns += [
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
]
