from rest_framework import serializers


class TranslateSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=1337)