from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import SimpleRouter
from api.views import UserTokenRefreshView, CustomEmailTokenObtainView
from article.views import ArticleViewSet, SliderViewSet, UploadArticleImageView, TagViewSet, CategoryViewSet, \
    UrlViewCountView
from favourite.views import FavouriteViewSet
from user.views import RegisterView, PasswordResetRequestView, PasswordResetConfirmView, \
    CheckOTPView
from translation.views import TranslateView


router = SimpleRouter()
router.register(r'articles', ArticleViewSet, basename='articles')
router.register(r'slider', SliderViewSet, basename='slider')
router.register(r'category', CategoryViewSet, basename='category')
router.register('tags', TagViewSet, basename='tags')
router.register('favourites', FavouriteViewSet, basename='favourites')
# router.register('grade', GradeView, basename='grade')
router.register('url-view-count', UrlViewCountView, basename='url-view-count')

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
# urlpatterns += [
#     path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
#     path('', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui')
# ]

