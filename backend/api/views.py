from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView


class SecuredView(APIView):
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="Use this endpoint to test if the user is authenticated")
    def get(self, request):
        content = {'message': 'OKe'}
        return Response(content)
