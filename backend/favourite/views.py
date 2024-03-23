from rest_framework.response import Response

from favourite.models import Favourite
from rest_framework.views import APIView

from favourite.serializers import FavouriteSerializer
from article.models import Article

from favourite.schemas import swagger_favourite_response_get, \
                              swagger_favourite_response_post, swagger_favourite_response_delete
from drf_yasg.utils import swagger_auto_schema

from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

RATELIMIT = '1/s'

class FavouriteViewSet(APIView):
    @method_decorator(ratelimit(key='ip', rate=RATELIMIT, method='POST', block=True))
    @swagger_auto_schema(responses=swagger_favourite_response_get, 
                         operation_summary='Get all favourites',
                         operation_description='Get all favourites for the current user')
    def get(self, request):
        user = request.user
        favourites = Favourite.objects.filter(user=user)
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)


    @method_decorator(ratelimit(key='ip', rate=RATELIMIT, method='POST', block=True))
    @swagger_auto_schema(responses=swagger_favourite_response_post,
                         operation_summary='Create a favourite',
                         operation_description='Create a favourite for the current user', 
                         request_body=FavouriteSerializer)
    def post(self, request):
        user = request.user

        article_id = request.data.get('article')
        if not Article.objects.filter(id=article_id).exists():
            return Response({'error': 'Article not found'}, status=404)
        
        article = Article.objects.get(id=article_id)
        if Favourite.objects.filter(user=user, article=article).exists():
            return Response({'error': 'Article already favourited'}, status=400)
        
        favourite = Favourite.objects.create(user=user, article=article)
        serializer = FavouriteSerializer(favourite)
        
        return Response(serializer.data)


    @method_decorator(ratelimit(key='ip', rate=RATELIMIT, method='DELETE', block=True))
    @swagger_auto_schema(responses=swagger_favourite_response_delete,
                         operation_summary='Delete a favourite', 
                         operation_description='Delete a favourite for the current user', 
                         request_body=FavouriteSerializer)
    def delete(self, request):
        article_id = request.data.get('id')
        user_id = request.user.id

        if not Favourite.objects.filter(article_id=article_id, user_id=user_id).exists():
            return Response({'error': 'Favourite not found'}, status=404)

        favourite = Favourite.objects.get(article_id=article_id, user=user_id)
        favourite.delete()
        return Response({'message': 'Favourite deleted'}, status=200)
