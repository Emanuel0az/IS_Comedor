from django.urls import path
from . import views
from .views import LoginView
from .views import LoginView2

urlpatterns = [
    # Usuarios
    path('users/', views.users_list, name='users_list'),
    path('users/<int:pk>/', views.users_detail, name='users_detail'),
    
    # Recetas
    path('recetas/', views.recetas_list, name='recetas_list'),
    path('recetas/<int:pk>/', views.recetas_detail, name='recetas_detail'),
    
    # Historial Ingredientes
    path('hist_ingredientes/', views.hist_ingredientes_list, name='hist_ingredientes_list'),
    path('hist_ingredientes/<int:pk>/', views.hist_ingredientes_detail, name='hist_ingredientes_detail'),
    
    # Ingredientes
    path('ingredientes/', views.ingredientes_list, name='ingredientes_list'),
    path('ingredientes/<int:pk>/', views.ingredientes_list, name='ingredientes_list'),

    # Lista Estudiante
    path('estudiantes/', views.estudiantes_list, name='students_list'),
    path('estudiantes/<int:pk>/', views.estudiantes_list, name='students_list'),

    # Lista Pagos   
    path('hist_pagos/', views.pagos_list, name='pagos_list'),
    path('hist_pagos/<int:pk>/', views.pagos_list, name='pagos_list'),
    
    path('login/', LoginView.as_view(), name='login'),
    path('login2/', LoginView2.as_view(), name='login'),
]

