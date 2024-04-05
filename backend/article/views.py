from django.contrib.postgres.search import SearchQuery, SearchVector
from django.shortcuts import render
from django.utils.decorators import method_decorator
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.filters import SearchFilter
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.mixins import DestroyModelMixin
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import serializers

from article.models import Article, Slider, Category
from article.permissions import IsAccountAdminOrReadOnly
from article.serializers import ArticleSerializer, ErrorResponseSerializer, SliderSerializer, \
    UploadArticleImageSerializer, CategorySerializer
from .filters import ArticleFilter


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
    queryset = Article.objects.filter(visible=True).order_by('created_at')
    serializer_class = ArticleSerializer
    permission_classes = [IsAccountAdminOrReadOnly]  
    filterset_class = ArticleFilter
    throttle_scope = 'article'

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.visible = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


@parser_classes((MultiPartParser,))
class SliderViewSet(viewsets.ModelViewSet):
    queryset = Slider.objects.order_by('created_at')
    serializer_class = SliderSerializer
    permission_classes = [IsAccountAdminOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save()

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)



# region Documentations
@method_decorator(name='post', decorator=swagger_auto_schema(
    operation_description="Upload an image for an article",
    responses={201: UploadArticleImageSerializer(), (400, 401, 403): ErrorResponseSerializer()},
    operation_summary="Upload an image for an article",
))
# endregion
class UploadArticleImageView(CreateAPIView, DestroyModelMixin):
    serializer_class = UploadArticleImageSerializer
    permission_classes = [IsAdminUser]

    throttle_scope = 'article'

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        image = serializer.save()

        return Response({'image': image.image.url,
                         'pk': image.pk}, status=status.HTTP_201_CREATED)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAccountAdminOrReadOnly]
    
    def perform_create(self, serializer):
        if Category.objects.filter(original_category=serializer.validated_data['original_category']).exists():
            raise serializers.ValidationError({'detail': 'Category already exists'})

        serializer.save()
