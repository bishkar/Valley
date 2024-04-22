from django.conf import settings
from facebook import GraphAPI, GraphAPIError


class Facebook:
    @staticmethod
    def validate(auth_token):
        try:
            graph = GraphAPI(access_token=auth_token)
            profile = graph.request('/me?fields=name, email')
            return profile | {'auth_token': auth_token}
        except GraphAPIError:
            return "The token is invalid or expired. Please login again."
