from django.db import models
from django.utils.text import slugify


class ArticleImage(models.Model):
    image = models.ImageField(upload_to=slugify('article_images'))
    name = models.CharField(max_length=100)

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.name = slugify(self.image.name)
        super().save(force_insert, force_update, using, update_fields)


class Tag(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.slug = slugify(self.name)
        super().save(force_insert, force_update, using, update_fields)


class Article(models.Model):
    original_title = models.CharField(max_length=100)
    translated_title = models.CharField(max_length=100)

    tags = models.ManyToManyField('Tag')

    images = models.ManyToManyField('ArticleImage')

    original_content = models.TextField()
    translated_content = models.TextField()

    link_to_product = models.URLField()

    visible = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    author = models.ForeignKey('user.User', on_delete=models.CASCADE)

    on_top = models.BooleanField(default=False)

    category = models.CharField(max_length=100, default="None")

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        super().save(force_insert, force_update, using, update_fields)

    @property
    def image_urls(self):
        return [image.image.url for image in self.images.all()]


class Slider(models.Model):
    article = models.OneToOneField(Article, on_delete=models.CASCADE)
    big_image = models.ImageField(upload_to='slider_images')

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def big_image_url(self):
        return self.big_image.url
