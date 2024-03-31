from rest_framework import serializers

from .models import Grade


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['grade', 'article', 'user']
        read_only_fields = ['user']
