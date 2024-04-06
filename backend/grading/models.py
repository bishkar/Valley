from django.db import models
from user.models import User
from article.models import Article


class Grade(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    grade = models.BooleanField(default=False)
