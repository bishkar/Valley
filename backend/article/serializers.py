from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from article.models import Article, Slider, ArticleImage, Tag


class ArticleSerializer(serializers.ModelSerializer):
    image_urls = serializers.SerializerMethodField('get_image_urls')

    class Meta:
        model = Article
        fields = ['pk', 'original_title', 'translated_title', 'original_content', 'translated_content',
                  'link_to_product', 'created_at', 'image_urls', 'images', 'tags']
        extra_kwargs = {
            'images': {'write_only': True},
            'tags': {'write_only': True}
        }
        write_only_fields = ['images']
        read_only_fields = ['created_at', 'pk', 'image_urls']

    @extend_schema_field(serializers.ListField(child=serializers.CharField()))
    def get_image_urls(self, obj):
        images = obj.images.all()
        return [image.image.url for image in images]


class UploadArticleImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()
    pk = serializers.IntegerField(read_only=True)

    class Meta:
        model = ArticleImage
        fields = ['image', 'pk']


class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = "__all__"


class ErrorResponseSerializer(serializers.Serializer):
    detail = serializers.CharField(help_text="Detail info about error")
    code = serializers.CharField(help_text="Code of error")
    messages = serializers.ListField(child=serializers.CharField(), help_text="List of error messages")

    class Meta:
        fields = ['detail', 'code', 'messages']
        read_only_fields = ['detail', 'code', 'messages']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['pk', 'name']
        read_only_fields = ['pk']
