from django.contrib.postgres.search import SearchQuery, SearchVector
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, parser_classes, action
from rest_framework.filters import SearchFilter
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.mixins import DestroyModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import generics, mixins

from article.models import Article, Slider, Category, Tag, UserUrlViewer
from article.permissions import IsAccountAdminOrReadOnly, IsUserPostAdminGet
from article.serializers import ArticleSerializer, ErrorResponseSerializer, SliderSerializer, \
    UploadArticleImageSerializer, CategorySerializer, TagSerializer, UrlViewCountSerializer, ShortArticleSerializer

from .filters import ArticleFilter
from article.filters import ArticleFilter
from .pagination import ArticlesResultsSetPagination

from .utils import get_client_ip

# region Documentations
@extend_schema_view(
    retrieve=extend_schema(
        description="Retrieve a single article",
        responses={200: ArticleSerializer(), (400, 401, 403): ErrorResponseSerializer()},
        summary="Retrieve a single article",
    ),
    list=extend_schema(
        description="Get all visible articles",
        responses={200: ArticleSerializer(many=True), (400, 401, 403): ErrorResponseSerializer()},
        summary="Get all visible articles",
    ),
    create=extend_schema(
        description="Create a new article (only for admin users)",
        responses={200: ArticleSerializer(), (400, 401, 403): ErrorResponseSerializer()},
        summary="Create a new article",
    ),
    update=extend_schema(
        description="Update an article (only for admin users)",
        responses={200: ArticleSerializer(), (400, 401, 403): ErrorResponseSerializer()},
        summary="Update an article",
    ),
    destroy=extend_schema(
        description="Delete an article (only for admin users)",
        responses={204: None, (400, 401, 403): ErrorResponseSerializer()},
        summary="Delete an article",
    ),

)
# endregion
class ArticleViewSet(viewsets.ModelViewSet):
    pagination_class = ArticlesResultsSetPagination

    queryset = Article.objects.filter(visible=True).order_by('created_at')
    # serializer_class = ArticleSerializer
    permission_classes = [IsAccountAdminOrReadOnly]
    search_fields = ['en_title', 'it_title', 'en_content', 'it_content']

    filter_backends = [SearchFilter, DjangoFilterBackend]
    filterset_class = ArticleFilter
    http_method_names = ['get', 'post', 'put', 'delete']
    throttle_scope = 'article'

    def get_serializer_class(self):
        if self.action == 'list':
            return ShortArticleSerializer
        return ArticleSerializer

    def perform_create(self, serializer):
        new_tags = []
        tags = self.request.data.get('article_tags')
        
        for tag in tags:
            if not Tag.objects.filter(name=tag).exists():
                new_tag = Tag.objects.create(name=tag)
                new_tags.append(new_tag)
            else:
                new_tags.append(Tag.objects.get(name=tag))

        serializer.validated_data['tags'] = new_tags
        serializer.save(author=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.visible = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @method_decorator(cache_page(60 * 15 ))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    # @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='user/tag',
    #         url_name='user/tag')
    # def get_favourites_by_tag(self, request, pk=None):
    #     print(pk)
    #     tag = request.query_params.get('tag')
    #     articles = Article.objects.filter(tags__slug=tag)
    #     serializer = ArticleSerializer(articles, many=True)
    #     return Response(serializer.data)


@parser_classes((MultiPartParser,))
@extend_schema_view(
    retrieve=extend_schema(
        description="Retrieve a single slider",
        responses={200: SliderSerializer(), (400, 401, 403): ErrorResponseSerializer()},
        summary="Retrieve a single slider",
    ),
    list=extend_schema(
        description="Get all sliders",
        responses={200: SliderSerializer(many=True), (400, 401, 403): ErrorResponseSerializer()},
        summary="Get all sliders",
    ),
    create=extend_schema(
        description="Create a new slider (only for admin users)",
        responses={200: SliderSerializer(), (400, 401, 403): ErrorResponseSerializer()},
        summary="Create a new slider",
    ),
    update=extend_schema(
        description="Update a slider (only for admin users)",
        responses={200: SliderSerializer(), (400, 401, 403): ErrorResponseSerializer()},
        summary="Update a slider",
    ),
    destroy=extend_schema(
        description="Delete a slider (only for admin users)",
        responses={204: None, (400, 401, 403): ErrorResponseSerializer()},
        summary="Delete a slider",
    ),
)
class SliderViewSet(viewsets.ModelViewSet):
    queryset = Slider.objects.order_by('created_at')
    serializer_class = SliderSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = [IsAccountAdminOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save()

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


# region Documentations
@extend_schema_view(
    post=extend_schema(
        description="Upload an image for an article",
        responses={201: UploadArticleImageSerializer(), (400, 401, 403): ErrorResponseSerializer()},
        summary="Upload an image for an article",
    ),
    destroy=extend_schema(
        description="Delete an image for an article (only for admin users)",
        responses={204: None, (400, 401, 403): ErrorResponseSerializer()},
        summary="Delete an image for an article",
    ),
)
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
        if Category.objects.filter(en_category=serializer.validated_data['en_category']).exists():
            raise serializers.ValidationError({'detail': 'Category already exists'})

        serializer.save()


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAdminUser]


class UrlViewCountView(viewsets.ModelViewSet):
    queryset = UserUrlViewer.objects.all()
    serializer_class = UrlViewCountSerializer
    permission_classes = [IsUserPostAdminGet]
    http_method_names = ['get', 'post'] 

    def retrieve(self, request, *args, **kwargs):
        article_id = kwargs.get('pk')
        articles_count = UserUrlViewer.objects.filter(article=article_id).count()

        return Response({'clicks_count': articles_count}, status=status.HTTP_200_OK)  

    
    def create(self, request, *args, **kwargs):
        pk = request.data.get('article')

        try:
            article = Article.objects.get(pk=pk)
            ip = get_client_ip(request)
            user_id = request.user.id

            if request.user.is_anonymous:
                user_id = None

            if UserUrlViewer.objects.filter(user=user_id, article=article, ip=ip).exists():
                return Response({'detail': 'Already viewed'}, status=status.HTTP_400_BAD_REQUEST)
            
            UserUrlViewer.objects.create(user=user_id, article=article, ip=ip)

            return Response({'detail': 'View count updated'}, status=status.HTTP_200_OK)
        
        except Article.DoesNotExist:
            return Response({'detail': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def list(self, request, *args, **kwargs):
        return Response({'detail': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    


