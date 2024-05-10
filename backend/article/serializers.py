from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from article.models import Article, Slider, ArticleImage, Category, Tag, UserUrlViewer


class ShortArticleSerializer(serializers.ModelSerializer):
    image_urls = serializers.SerializerMethodField('get_image_urls')

    class Meta:
        model = Article
        fields = ['pk', 'en_title', 'it_title', 'created_at', 'category', 'tags_name', 'on_top', 'image_urls']
        read_only_fields = ['created_at', 'pk', 'tags_name', 'image_urls']

    @extend_schema_field(serializers.ListField(child=serializers.CharField()))
    def get_image_urls(self, obj):
        images = obj.images.all()
        return [image.image.url for image in images]


class ShortArticleSerializerWithFavorite(ShortArticleSerializer):
    is_favourite = serializers.BooleanField()

    class Meta(ShortArticleSerializer.Meta):
        fields = ShortArticleSerializer.Meta.fields + ['is_favourite']


class ArticleSerializer(serializers.ModelSerializer):
    image_urls = serializers.SerializerMethodField('get_image_urls')

    class Meta:
        model = Article
        fields = ['pk', 'en_title', 'it_title', 'en_content', 'it_content', 'link_to_product', 'created_at', 'image_urls', 'images', 'category', 'tags', 'tags_name', 'on_top']

        extra_kwargs = {
            'images': {'write_only': True},
            'tags': {'write_only': True, 'required': False},
        }
        write_only_fields = ['images']
        read_only_fields = ['created_at', 'pk', 'image_urls', 'tags_name']

    @extend_schema_field(serializers.ListField(child=serializers.CharField()))
    def get_image_urls(self, obj):
        images = obj.images.all()
        return [image.image.url for image in images]


class ArticleSerializerAdmin(ArticleSerializer):

    class Meta(ArticleSerializer.Meta):
        fields = ArticleSerializer.Meta.fields

    @extend_schema_field(serializers.ListField(child=serializers.CharField()))
    def get_image_urls(self, obj):
        images = obj.images.all()
        return [{image.id: image.image.url} for image in images]


class UploadArticleImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()
    pk = serializers.IntegerField(read_only=True)

    class Meta:
        model = ArticleImage
        fields = ['image', 'pk']
        read_only_fields = ['pk']


class UrlViewCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserUrlViewer
        fields = ['article']


class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = ['id', 'big_image', 'article', 'created_at']


class ErrorResponseSerializer(serializers.Serializer):
    detail = serializers.CharField(help_text="Detail info about error")
    code = serializers.CharField(help_text="Code of error")
    messages = serializers.ListField(child=serializers.CharField(), help_text="List of error messages")

    class Meta:
        fields = ['detail', 'code', 'messages']
        read_only_fields = ['detail', 'code', 'messages']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['pk', 'en_category', 'it_category']
        read_only_fields = ['pk']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['pk', 'name']
        read_only_fields = ['pk']
