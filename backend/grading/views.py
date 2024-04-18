from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets 
from rest_framework import status
from django.http import HttpResponse

from .models import Grade
from .serializers import GradeSerializer
from django.utils.translation import gettext as _


class GradeView(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        user = self.request.user
        article = serializer.validated_data['article']

        if Grade.objects.filter(user=user, article=article).exists():
            return Response({'error': _('You have already graded this article')}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save(user=self.request.user)

    def retrieve(self, request, pk=None, *args, **kwargs):
        article_id = pk
        user = request.user

        try:
            article = Grade.objects.get(user=user, article=article_id)
            grade = article.grade
        except Grade.DoesNotExist:
            grade = None
        return Response({'grades': grade})
    
    def update(self, request, pk=None, *args, **kwargs):
        article_id = pk
        user = request.user
        grade = request.data['grade']

        try:
            article = Grade.objects.get(user=user, article=article_id)
            article.grade = grade
            article.save()
        except Grade.DoesNotExist:
            Grade.objects.create(user=user, article_id=article_id, grade=grade)
        return Response({'grades': grade})
    
    def destroy(self, request, pk=None, *args, **kwargs):
        article_id = pk
        user = request.user

        try:
            article = Grade.objects.get(user=user, article=article_id)
            article.delete()
        except Grade.DoesNotExist:
            return Response({'error': 'You have not graded this article'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'grades': None})
    
    def list(self, request, *args, **kwargs):
        return HttpResponse('Method not allowed', status=301)

   
