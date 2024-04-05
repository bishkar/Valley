import django_filters
from article.models import Article


class ArticleFilter(django_filters.FilterSet):
    tag = django_filters.CharFilter(lookup_expr='icontains', field_name='tags__name')
    en_category = django_filters.CharFilter(lookup_expr='icontains', field_name='category__en_category')
    it_category = django_filters.CharFilter(lookup_expr='icontains', field_name='category__it_category')

    class Meta:
        model = Article
        fields = ['tag', 'en_category', 'it_category']
