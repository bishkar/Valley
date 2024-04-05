from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter
from rest_framework import mixins, viewsets, generics
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, NotAcceptable
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from favourite.models import Favourite
from article.models import Article
from favourite.serializers import FavouriteSerializer, InfoSerializer


@extend_schema_view(
    create=extend_schema(
        description="Create a new favourite",
        responses={200: FavouriteSerializer()},
        summary="Create a new favourite",
    ),
    retrieve=extend_schema(
        parameters=[OpenApiParameter(name='id', type=str, location=OpenApiParameter.PATH)],
        description="Get all favourites",
        responses={200: FavouriteSerializer(many=True)},
        summary="Get all favourites",
    ),
    destroy=extend_schema(
        description="Delete a favourite",
        responses={200: InfoSerializer()},
        summary="Delete a favourite",
        parameters=[OpenApiParameter(name='id', type=str, location=OpenApiParameter.PATH)]
    ),
    get_favourites_by_tag=extend_schema(
        description="Get all favourites by tag",
        responses={200: FavouriteSerializer(many=True)},
        summary="Get all favourites by tag",
        parameters=[OpenApiParameter(name='tag_name', type=str, location=OpenApiParameter.PATH)]
    )
)
class FavouriteViewSet(mixins.CreateModelMixin,
                       mixins.DestroyModelMixin,
                       mixins.RetrieveModelMixin,
                       viewsets.GenericViewSet):
    throttle_scope = 'favourite'
    serializer_class = FavouriteSerializer
    permission_classes = [IsAuthenticated]

    # @swagger_auto_schema(responses=swagger_favourite_response_get,
    #                      operation_summary='Get all favourites',
    #                      operation_description='Get all favourites for the current user')

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Favourite.objects.none()
        return Favourite.objects.filter(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        user = request.user
        favourites = Favourite.objects.filter(user=user)
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)

    # @swagger_auto_schema(responses=swagger_favourite_response_post,
    #                      operation_summary='Create a favourite',
    #                      operation_description='Create a favourite for the current user',
    #                      request_body=FavouriteSerializer)
    def create(self, request, *args, **kwargs):
        user = request.user

        article_id = request.data.get('article')
        if not Article.objects.filter(id=article_id).exists():
            raise NotFound('Article not found')

        article = Article.objects.get(id=article_id)
        if Favourite.objects.filter(user=user, article=article).exists():
            return NotAcceptable({'error': 'Article already favourited'})

        favourite = Favourite.objects.create(user=user, article=article)
        serializer = FavouriteSerializer(favourite)

        return Response(serializer.data)

    # @swagger_auto_schema(responses=swagger_favourite_response_delete,
    #                      operation_summary='Delete a favourite',
    #                      operation_description='Delete a favourite for the current user',
    #                      request_body=FavouriteSerializer)
    def destroy(self, request, *args, **kwargs):
        article_id = request.data.get('id')
        user_id = request.user.id

        if not Favourite.objects.filter(article_id=article_id, user_id=user_id).exists():
            return NotFound({'error': 'Favourite not found'}, status=404)

        favourite = Favourite.objects.get(article_id=article_id, user=user_id)
        favourite.delete()

    @action(detail=False, methods=['GET'], url_path='tag/(?P<tag_name>.+)')
    def get_favourites_by_tag(self, request, tag_name):
        user = request.user
        favourites = Favourite.objects.filter(user=user, article__tags__name=tag_name)
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)


# class UserFavouriteTag(generics.RetrieveAPIView):
#     def get(self, request, *args, **kwargs):
#         user = request.user
#         tag_name = kwargs['tag_name']
#         favourites = Favourite.objects.filter(user=user, article__tags__name=tag_name)
#         serializer = FavouriteSerializer(favourites, many=True)
#         return Response(serializer.data)
