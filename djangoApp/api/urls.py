from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.users_list, name='users_list'),
    path('users/<int:pk>/', views.users_list, name='users_list'),
    path('toys/', views.toys_list, name='toys'),
    path('toys/<int:pk>/', views.toys_list, name='toys'),
]