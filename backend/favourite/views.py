from django.db.models import Q
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from favourite.models import Favourite
from favourite.serializers import FavouriteSerializer, InfoSerializer
from django.utils.translation import gettext as _


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

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Favourite.objects.none()

        visible_article = Q(article__visible=True)
        user_article = Q(user=self.request.user)
        return Favourite.objects.filter(visible_article & user_article)

    def retrieve(self, request, *args, **kwargs):
        user = request.user
        favourites = Favourite.objects.filter(user=user, article__visible=True)
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        print(kwargs)
        article_id = request.data.get('id')
        print(article_id)
        user_id = request.user.id

        if not Favourite.objects.filter(article_id=article_id, user_id=user_id).exists():
            return Response(InfoSerializer({'status': 'failed', 'message': _('Favourite not found')}).data)

        favourite = Favourite.objects.get(article_id=article_id, user_id=user_id)
        favourite.delete()

        return Response(InfoSerializer({'status': 'success', 'message': _('Favourite deleted')}).data)

    @action(detail=False, methods=['GET'], url_path='tag/(?P<tag_name>.+)')
    def get_favourites_by_tag(self, request, tag_name):
        user = request.user

        favourites = Favourite.objects.filter(user=user, article__tags__name__icontains=tag_name, article__visible=True)

        serializer = FavouriteSerializer(favourites, many=True)

        return Response(serializer.data)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
