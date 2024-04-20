from rest_framework import serializers


class TranslateSerializer(serializers.Serializer):
    data = serializers.JSONField()
    