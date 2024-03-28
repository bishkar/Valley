from translate import Translator
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAdminUser

from .serializer import TranslateSerializer


class TranslateView(CreateAPIView):
    serializer_class = TranslateSerializer
    permission_classes = [IsAdminUser]

    def post(self, request):
        text = request.data.get('text', '')
        translator = Translator(to_lang='en', from_lang='it')
        translation = translator.translate(text)

        return Response({'translation': translation})
