from drf_yasg import openapi

swagger_favourite_response_get = {
    200: openapi.Schema(
        title="Favourite",
        type=openapi.TYPE_ARRAY,
        items=openapi.Items(
            title="FavouriteItem",
            type=openapi.TYPE_OBJECT,
            properties={
                'article_id': openapi.Schema(type=openapi.TYPE_INTEGER, minimum_length=1, 
                                             maximum_length=100, title='Article ID'),
                'user': openapi.Schema(type=openapi.TYPE_INTEGER, minimum_length=1, 
                                             maximum_length=100, title='User ID'),
                'created_at': openapi.Schema(type=openapi.TYPE_STRING, title='Created At')
            }
        )
    )
}


swagger_favourite_response_post = {
    201: openapi.Schema(
        title="Favourite",
        type=openapi.TYPE_OBJECT,
        properties={
            'article_id': openapi.Schema(type=openapi.TYPE_INTEGER, minimum_length=1,
                                         maximum_length=100, title='Article ID'),
            'user': openapi.Schema(type=openapi.TYPE_INTEGER, minimum_length=1, 
                                         maximum_length=100, title='User ID'),
            'created_at': openapi.Schema(type=openapi.TYPE_STRING, title='Created At')
        }
    ),
    400: openapi.Schema(
        title="Favourite",
        type=openapi.TYPE_OBJECT,
        properties={
            'error': openapi.Schema(type=openapi.TYPE_STRING, title='Error', description='Article already favourited')
        }
    ),
    404: openapi.Schema(
        title="Favourite",
        type=openapi.TYPE_OBJECT,
        properties={
            'error': openapi.Schema(type=openapi.TYPE_STRING, title='Error', description='Article not found')
        }
    )
}

swagger_favourite_response_delete = {
    204: openapi.Schema(
        title="Favourite",
        type=openapi.TYPE_OBJECT,
        properties={
            'message': openapi.Schema(type=openapi.TYPE_STRING, title='Message', description='Favourite deleted')
        }
    ),
    404: openapi.Schema(
        title="Favourite",
        type=openapi.TYPE_OBJECT,
        properties={
            'error': openapi.Schema(type=openapi.TYPE_STRING, title='Error', description='Favourite not found')
        }
    )
}
