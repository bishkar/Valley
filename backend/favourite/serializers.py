from rest_framework import serializers

from article.models import Article
from article.views import ArticleViewSet
from .models import Favourite


class FavouriteSerializer(serializers.ModelSerializer):
    article = ArticleViewSet(required=False, read_only=True, source='*')

    class Meta:
        model = Favourite
        fields = ['article', 'user', 'created_at']
        read_only_fields = ['created_at', 'user']
        extra_kwargs = {
            'article': {'required': True, 'help_text': 'Article ID'},
            'user': {"required": True}
        }

    def validate(self, attrs):
        user_id = self.context['request'].user.id
        article = attrs['article']
        if not article.visible:
            raise serializers.ValidationError({'message': 'Article does not exist or is not visible'})
        if Favourite.objects.filter(article=attrs['article'], user=user_id).exists():
            raise serializers.ValidationError({"message": 'This article is already in your favourites'})

        return attrs


class InfoSerializer(serializers.Serializer):
    message = serializers.CharField()

    class Meta:
        fields = ['message']
        read_only_fields = ['message']
