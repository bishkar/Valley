from rest_framework import serializers

from article.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['original_title', 'translated_title', 'original_content', 'translated_content',
                  'link_to_product', 'slug', 'created_at']
        read_only_fields = ['slug', 'created_at']


class ErrorResponseSerializer(serializers.Serializer):
    detail = serializers.CharField(help_text="Detail info about error")
    code = serializers.CharField(help_text="Code of error")
    messages = serializers.ListField(child=serializers.CharField(), help_text="List of error messages")

    class Meta:
        fields = ['detail', 'code', 'messages']
        read_only_fields = ['detail', 'code', 'messages']