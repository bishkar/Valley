from django.db import models


class Favourite(models.Model):
    favourite_id = models.AutoField(primary_key=True)
    article = models.ForeignKey('article.Article', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('user.User', models.DO_NOTHING, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
