from translate import Translator
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework import status

from .serializers import TranslateSerializer

from drf_spectacular.utils import extend_schema

translator = Translator(to_lang='en', from_lang='it')
fields_to_translate = ["title", "caption", "message", "text"]


@extend_schema(
    request=TranslateSerializer,
    responses={200: TranslateSerializer}
)
class TranslateView(CreateAPIView):
    serializer_class = TranslateSerializer
    permission_classes = [IsAdminUser]


    def post(self, request, *args, **kwargs):
        data = request.data
        translated_data = data[:]

        for item in translated_data:
            data_to_translate = item.get("data", {})
            for field, value in data_to_translate.items():
                if field in fields_to_translate:
                    if len(value) > 500:
                        parts = [value[i:i + 500] for i in range(0, len(value), 500)]
                        translated_parts = [translator.translate(part) for part in parts]
                        data_to_translate[field] = "".join(translated_parts)
                        continue
                    
                    data_to_translate[field] = translator.translate(value)
            item["data"] = data_to_translate

        return Response(translated_data, status=status.HTTP_200_OK)
