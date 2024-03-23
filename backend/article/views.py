from django.shortcuts import render
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status
from rest_framework.response import Response

from article.models import Article
from article.permissions import IsAccountAdminOrReadOnly
from article.serializers import ArticleSerializer, ErrorResponseSerializer

from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

RATELIMIT = '1/s'

# region Documentations
@method_decorator(name='list', decorator=swagger_auto_schema(
    operation_description="Get all visible articles",
    responses={200: ArticleSerializer(many=True), (400, 401, 403): ErrorResponseSerializer()},
    operation_summary="Get all visible articles",
))
@method_decorator(name='create', decorator=swagger_auto_schema(
    operation_description="Create a new article (only for admin users)",
    responses={200: ArticleSerializer(), (400, 401, 403): ErrorResponseSerializer()},
    operation_summary="Create a new article",
))
@method_decorator(name='update', decorator=swagger_auto_schema(
    operation_description="Update an article (only for admin users)",
    responses={200: ArticleSerializer(), (400, 401, 403): ErrorResponseSerializer()},
    operation_summary="Update an article",
))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(
    deprecated=True,
))
@method_decorator(name='destroy', decorator=swagger_auto_schema(
    operation_description="Delete an article (only for admin users)",
    responses={200: ArticleSerializer(), (400, 401, 403): ErrorResponseSerializer()},
    operation_summary="Delete an article",
))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(
    operation_description="Retrieve a single article",
    responses={200: ArticleSerializer(), (400, 401, 403): ErrorResponseSerializer()},
    operation_summary="Retrieve a single article",
))
# endregion
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.filter(visible=True)
    serializer_class = ArticleSerializer
    permission_classes = [IsAccountAdminOrReadOnly]

    @method_decorator(ratelimit(key='ip', rate=RATELIMIT, method='POST', block=True))
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @method_decorator(ratelimit(key='ip', rate=RATELIMIT, method='PUT', block=True))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
