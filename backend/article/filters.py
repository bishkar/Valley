import django_filters

from article.models import Article


class ArticleFilter(django_filters.FilterSet):
    tag = django_filters.CharFilter(lookup_expr='icontains', field_name='tags__name')

    class Meta:
        model = Article
        fields = ['tag']
