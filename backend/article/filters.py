import django_filters
from article.models import Article


class ArticleFilter(django_filters.FilterSet):
    tag = django_filters.CharFilter(lookup_expr='icontains', field_name='tags__name')
    en_category = django_filters.CharFilter(lookup_expr='icontains', field_name='category__en_category')
    it_category = django_filters.CharFilter(lookup_expr='icontains', field_name='category__it_category')
    category_id = django_filters.NumberFilter(field_name='category__pk')

    class Meta:
        model = Article
        fields = ['it_title', 'en_title', 'tag', 'en_category', 'it_category']
