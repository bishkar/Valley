from translate import Translator
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAdminUser

from .serializers import TranslateSerializer

translator = Translator(to_lang='en', from_lang='it')


class TranslateView(CreateAPIView):
    serializer_class = TranslateSerializer
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        text = request.data.get('text', '')
        translation = translator.translate(text)

        return Response({'translation': translation})
