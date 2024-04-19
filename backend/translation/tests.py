from rest_framework.test import APITestCase
from user.models import User
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
import requests
import json


class Translation(APITestCase):
    def setUp(self):
        self.url = "/api/v1/translate/"
        self.data = [
        {
            "id": "jsnz7-hho4",
            "type": "header",
            "data": {
            "text": "Ciao! Come stai?",
            "level": 2
            }
        },
        {
            "id": "PYoj-ZpE5m",
            "type": "paragraph",
            "data": {
            "text": "Mi piace molto il cibo italiano.",
            "caption": "Mi piace molto il cibo italiano.",
            "message": "Mi piace molto il cibo italiano.",
            "alignment": "left"
            }
        }
        ]
        try:
            self.admin = User.objects.create_superuser(email="admin@admin.com", password="admin")
            self.user = User.objects.create(email="user@user.com", first_name="as", last_name="as",)
            self.user.set_password("user")
            self.user.save()

            self.admin_token = AccessToken.for_user(self.admin)
            self.user_token = AccessToken.for_user(self.user)

        except json.decoder.JSONDecodeError:
            print("Unable to decode JSON")
           

    def test_admin_user_can_translate(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.admin_token))
        response = self.client.post(self.url, self.data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [
        {
            "id": "jsnz7-hho4",
            "type": "header",
            "data": {
                "text": "Hi there! How are you?",
                "level": 2
            }
        },
        {
            "id": "PYoj-ZpE5m",
            "type": "paragraph",
            "data": {
                "text": "I really like Italian food.",
                "caption": "I really like Italian food.",
                "message": "I really like Italian food.",
                "alignment": "left"
            }
        }
    ])
        
    def test_unauthenticated_user_cannot_translate(self):
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_cannot_translate(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.user_token))
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def tearDown(self):
        self.admin.delete()
        self.user.delete()

        self.client.logout()
