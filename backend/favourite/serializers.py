from rest_framework import serializers
from .models import Favourite


class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = ['article', 'user', 'created_at']
        read_only_fields = ['created_at', 'user']
        extra_kwargs = {
            'article': {'required': True, 'help_text': 'Article ID'},
        }

    def validate(self, attrs):
        if Favourite.objects.filter(article=attrs['article'], user=self.context['request'].user).exists():
            raise serializers.ValidationError('This article is already in your favourites')
        return attrs
