from django.urls import path

from facebook_auth.views import FacebookApiView

urlpatterns = [
    path('', FacebookApiView.as_view(), name='facebook_token'),
]
