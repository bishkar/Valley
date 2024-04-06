from rest_framework import serializers

from article.models import Article
from article.serializers import ArticleSerializer
from .models import Favourite


class FavouriteSerializer(serializers.ModelSerializer):
    article = serializers.SerializerMethodField("get_article")
    # article = serializers.IntegerField(write_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    article_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Favourite
        fields = ['article', 'created_at', 'user', 'article_id']
        read_only_fields = ['created_at', 'article']
        # extra_kwargs = {
        #     'user': {"required": True}
        # }

    # def create(self, validated_data):
    #     user_id = self.context['request'].user.id
    #     article = validated_data['article']
    #     favourite = Favourite.objects.create(user_id=user_id, article=article)
    #     return favourite

    @staticmethod
    def get_article(obj):
        print(obj.article)
        return ArticleSerializer(obj.article).data

    def validate(self, attrs):
        user_id = self.context['request'].user.id
        if 'article_id' in attrs:
            article = attrs['article_id']
            if isinstance(article, int):
                article = Article.objects.filter(pk=article).first()
            if not article or not article.visible:
                raise serializers.ValidationError({'message': 'Article does not exist or is not visible'})
            if Favourite.objects.filter(article=attrs['article_id'], user=user_id).exists():
                raise serializers.ValidationError({"message": 'This article is already in your favourites'})

        return attrs


class InfoSerializer(serializers.Serializer):
    message = serializers.CharField()

    class Meta:
        fields = ['message']
        read_only_fields = ['message']
