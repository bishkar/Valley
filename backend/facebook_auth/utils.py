from django.conf import settings
from facebook import GraphAPI, GraphAPIError

class Facebook:
    @staticmethod
    def validate(auth_token):
        try:
            graph = GraphAPI()
            token = graph.get_access_token_from_code(auth_token,
                                                     redirect_uri=settings.FACEBOOK_CALLBACK_URL,
                                                     app_id=settings.FACEBOOK_APP_ID,
                                                     app_secret=settings.FACEBOOK_SECRET_KEY)

            graph.access_token = token['access_token']
            profile = graph.request('/me?fields=name, email')
            return profile | {'auth_token': auth_token}
        except GraphAPIError:
            return "The token is invalid or expired. Please login again."
