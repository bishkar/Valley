from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.test import APITestCase

from .models import Grade
from user.models import User
from article.models import Article


class GradeTest(APITestCase):
    def setUp(self):
        self.url = "/api/v1/grade/"

        self.admin = User.objects.create_superuser(email="admin@admin.com", password="admin")
        self.user = User.objects.create(email="user@user.com", first_name="as", last_name="as",)
        self.user.set_password("user")
        self.user.save()
        
        self.admin_token = AccessToken.for_user(self.admin)
        self.user_token = AccessToken.for_user(self.user)

    # def test_user_can_grade(self):
    #     article = Article.objects.create(en_title="Title", it_title="Titolo",
    #                                           en_content="Text", it_content="Testo",
    #                                           link_to_product="https://www.google.com",
    #                                           author=self.user)
        
    #     self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.user_token))
    #     response = self.client.post(self.url, {"article" : article.id, "grade" : True}, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # def test_invalid_pk(self):
    #     self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.user_token))
    #     response = self.client.post(self.url, {"article": 423, "grade": True}, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_invalid_grade(self):
    #     article = Article.objects.create(en_title="Titleee", it_title="Titolo",
    #                                           en_content="Text", it_content="Testo",
    #                                           link_to_product="https://www.google.com",
    #                                           author=self.user)
    #     self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.user_token))
    #     response = self.client.post(self.url, {"article": article.id, "grade": "XUI"}, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    # def test_update_grade(self):
    #     article = Article.objects.create(en_title="Titleee", it_title="Titolo",
    #                                           en_content="Text", it_content="Testo",
    #                                           link_to_product="https://www.google.com",
    #                                           author=self.user)
    #     grade = Grade.objects.create(article=article, user=self.user, grade=True)

    #     self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.user_token))
    #     response = self.client.put(self.url + f"{grade.id}/", {"grade": False}, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data['grade'], False)

    # def test_delete_grade(self):
    #     article = Article.objects.create(en_title="Titleee", it_title="Titolo",
    #                                           en_content="Text", it_content="Testo",
    #                                           link_to_product="https://www.google.com",
    #                                           author=self.user)
    #     grade = Grade.objects.create(article=article, user=self.user, grade=True)

    #     self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.user_token))
    #     response = self.client.delete(self.url + f"{grade.id}/")

    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self):
        User.objects.all().delete()
        Article.objects.all().delete()
        Grade.objects.all().delete()

        self.client.logout()
        



