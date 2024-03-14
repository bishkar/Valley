from facebook import GraphAPI, GraphAPIError


class Facebook:
    @staticmethod
    def validate(auth_token):
        try:
            graph = GraphAPI(auth_token)
            profile = graph.request('/me?fields=name, email')
            return profile
        except GraphAPIError:
            return "The token is invalid or expired. Please login again."
