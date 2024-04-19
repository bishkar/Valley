from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_nested import routers
from api.views import UserTokenRefreshView, CustomEmailTokenObtainView
from article.views import ArticleViewSet, SliderViewSet, UploadArticleImageView, TagViewSet, CategoryViewSet,\
    UrlViewCountView
from favourite.views import FavouriteViewSet # UserFavouriteTag
from facebook_auth.views import FacebookApiView
from grading.views import GradeView
from user.views import RegisterView, EmailTokenObtainPairView, PasswordResetRequestView, PasswordResetConfirmView, \
    CheckOTPView
from translation.views import TranslateView
from grading.views import GradeView

# from api.views import secure_view


# schema_view = get_schema_view(
#     openapi.Info(
#         title="Valley Backend APIs",
#         default_version='v1.0.0',
#         terms_of_service="https://www.google.com/policies/terms/"
#     ),
#     public=True,
#     permission_classes=[permissions.AllowAny, ],
# )

router = routers.SimpleRouter()
router.register(r'articles', ArticleViewSet, basename='articles')
router.register(r'slider', SliderViewSet, basename='slider')
router.register(r'category', CategoryViewSet, basename='category')
router.register('grade', GradeView, basename='grade')
router.register('tags', TagViewSet, basename='tags')
router.register('favourites', FavouriteViewSet, basename='favourites')
router.register('grade', GradeView, basename='grade')
router.register('url-view-count', UrlViewCountView, basename='url-view-count')

# domains_router = routers.NestedSimpleRouter(router, r'favourites', lookup='favourites')
# domains_router.register(r'user', UserFavouriteTag, basename='domain-nameservers')

urlpatterns = [
    path("token/email/", CustomEmailTokenObtainView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", UserTokenRefreshView.as_view(), name="token_refresh"),
    path("token/facebook/", include('facebook_auth.urls')),

    path("register/", RegisterView.as_view(), name="register_view"),

    # reset password
    path("reset-password/request/<str:email>/", PasswordResetRequestView.as_view(), name="password_reset_request"),
    path("reset-password/verify/otp/<str:email>/<str:otp>/", CheckOTPView.as_view(), name="password_verify_otp"),
    path("reset-password/confirm/", PasswordResetConfirmView.as_view(), name="password_change"),

    # translation
    path("translate/", TranslateView.as_view(), name="translate"),

    # article image
    path("articles/image/upload", UploadArticleImageView.as_view(), name="upload_article_image"),

    # path("articles/search/", ArticleSearchView.as_view(), name="search_article"),
    # # swagger json
    # path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),

]

urlpatterns += router.urls

# debug
urlpatterns += [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui')
]
# urlpatterns += [
#     path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
#     path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
# ]
