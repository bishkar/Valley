from django.db import models
from django.utils.text import slugify


class Article(models.Model):
    original_title = models.CharField(max_length=100)
    translated_title = models.CharField(max_length=100)

    original_content = models.TextField()
    translated_content = models.TextField()

    link_to_product = models.URLField()
    slug = models.SlugField(unique=True, blank=True)

    visible = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    author = models.ForeignKey('user.User', on_delete=models.CASCADE)

    on_top = models.BooleanField(default=False)

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        if not self.slug:
            self.slug = slugify(self.original_title)
        super().save(force_insert, force_update, using, update_fields)


class Slider(models.Model):
    article = models.OneToOneField(Article, on_delete=models.CASCADE)
    big_image = models.ImageField()

    created_at = models.DateTimeField(auto_now_add=True)
