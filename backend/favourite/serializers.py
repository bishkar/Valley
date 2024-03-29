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