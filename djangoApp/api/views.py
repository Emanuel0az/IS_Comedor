# @api_view(["Get", "POST", "PUT", "Delete"])
# def Users (request):
#     return Response({
#         "users": [
#             {
#                 'id': '878787',
#                 'name': 'John Doe',
#                 'age': 30
#             },
#         ]
#     })
    


# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Users
from .models import Toys
from .serializers import userSerializer
from.serializers import toysSerializer

