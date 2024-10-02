from django.urls import path
from . import views

urlpatterns = [
    # Rutas para Usuarios
    path('users/', views.users_list, name='users_list'),
    path('users/<int:pk>/', views.users_detail, name='users_detail'),
    
    # Rutas para Recetas
    path('recetas/', views.recetas_list, name='recetas_list'),
    path('recetas/<int:pk>/', views.recetas_detail, name='recetas_detail'),
    
    # Rutas para Historial de Ingredientes
    path('hist_ingredientes/', views.hist_ingredientes_list, name='hist_ingredientes_list'),
    path('hist_ingredientes/<int:pk>/', views.hist_ingredientes_detail, name='hist_ingredientes_detail'),
    
    # Rutas para Ingredientes
    path('ingredientes/', views.ingredientes_list, name='ingredientes_list'),
    path('ingredientes/<int:pk>/', views.ingredientes_list, name='ingredientes_list'),
    

    path('asistencias/', views.asistencias_list, name='asistencias_list'),
    path('asistencias/<int:pk>/', views.asistencias_detail, name='asistencias_detail'),


    path('estudiantes/', views.estudiantes_list, name='students_list'),
    path('estudiantes/<int:pk>/', views.estudiantes_list, name='students_list'),
]

