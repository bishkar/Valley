from rest_framework.response import Response

from favourite.models import Favourite
from favourite.serializers import FavouriteSerializer
from article.models import Article
from user.models import User
from rest_framework.views import APIView


class FavouriteViewSet(APIView):
    def get(self, request):
        user = request.user
        favourites = Favourite.objects.filter(user=user)
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user

        article_id = request.data.get('article')
        article = Article.objects.get(id=article_id)
        if Favourite.objects.filter(user=user, article=article).exists():
            return Response({'error': 'Article already favourited'}, status=400)
        
        favourite = Favourite.objects.create(user=user, article=article)
        serializer = FavouriteSerializer(favourite)
        
        return Response(serializer.data)

    def delete(self, request):
        import logging
        logger = logging.getLogger(__name__)

        article_id = request.data.get('id')
        user_id = request.user.id
        logger.error(user_id, article_id)

        if not Favourite.objects.filter(article_id=article_id, user_id=user_id).exists():
            return Response({'error': 'Favourite not found'}, status=404)

        favourite = Favourite.objects.get(article_id=article_id, user=user_id)
        favourite.delete()
        return Response({'message': 'Favourite deleted'}, status=200)

    