from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView

from user.utils import *
from user.models import User


class SecuredView(APIView):
    @permission_classes([IsAuthenticated])
    @swagger_auto_schema(operation_description="Use this endpoint to test if the user is authenticated")
    def get(self, request):
        content = {'message': 'OKe'}
        return Response(content)
    

class RestorePasswordView(APIView):
    @swagger_auto_schema(operation_description="Use this endpoint to restore password")
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email)
        if user.exists():
            user = user.first()

            otp = generate_otp()
            
            user.otp = otp
            user.save()

            send_otp_mail(email, otp)

            return Response({'otp': "OKe"})
        return Response({'message': 'User not found'}, status=404)
