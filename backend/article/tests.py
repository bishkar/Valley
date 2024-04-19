from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from article.models import Article, UserUrlViewer
from user.models import User


class UserUrlViewerTest(APITestCase):
    def setUp(self):
        self.url = "/api/v1/url-view-count/"

        self.admin = User.objects.create_superuser(email="admin@admin.com", password="admin")
        self.admin2 = User.objects.create_superuser(email="admin2@admin.com", password="admin")
        self.user = User.objects.create(email="user@user.com", first_name="as", last_name="as",)
        self.user.set_password("user")
        self.user.save()

        self.admin_token = AccessToken.for_user(self.admin)
        self.admin2_token = AccessToken.for_user(self.admin2)
        self.user_token = AccessToken.for_user(self.user)

        self.article = Article.objects.create(en_title="Title", it_title="Titolo",
                                              en_content="Text", it_content="Testo",
                                              link_to_product="https://www.google.com",
                                              author=self.user)

    def test_user_can_not_add_view(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.user_token))
        response = self.client.post(self.url + f"{self.article.id}/", format='json')
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_add_view(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.admin_token))
        response = self.client.post(self.url + f"{self.article.id}/", format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_double_view(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.admin_token))
        response = self.client.post(self.url + f"{self.article.id}/", format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.post(self.url + f"{self.article.id}/", format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_multiply_views(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.admin_token))
        response = self.client.post(self.url + f"{self.article.id}/", format='json')

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.admin2_token))
        response = self.client.post(self.url + f"{self.article.id}/", format='json')

        response = self.client.get(self.url + f"{self.article.id}/", format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['clicks_count'], 2)
        
    def tearDown(self) -> None:
        UserUrlViewer.objects.all().delete()
        Article.objects.all().delete()
        User.objects.all().delete()
        
        self.client.logout()
