from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.users_list, name='users_list'),
    path('users/<int:pk>/', views.users_list, name='users_list'),
    
    path('recetas/', views.recetas_list, name='recetas_list'),
    path('recetas/<int:pk>/', views.recetas_list, name='recetas_list'),
    
    path('compras/', views.compras_list, name='compras_list'),
    path('compras/<int:pk>/', views.compras_list, name='compras_list'),
    
    path('donaciones/', views.donaciones_list, name='donaciones_list'),
    path('donaciones/<int:pk>/', views.donaciones_list, name='donaciones_list'),
    
    path('hist_ingredientes/', views.hist_ingredientes_list, name='hist_ingredientes_list'),
    path('hist_ingredientes/<int:pk>/', views.hist_ingredientes_list, name='hist_ingredientes_list'),
    
    path('proveedores/', views.proveedores_list, name='proveedores_list'),
    path('proveedores/<int:pk>/', views.proveedores_list, name='proveedores_list'),
    
    path('ingredientes/', views.ingredientes_list, name='ingredientes_list'),
    path('ingredientes/<int:pk>/', views.ingredientes_list, name='ingredientes_list'),
    
    path('students/', views.students_list, name='students_list'),
    path('students/<int:pk>/', views.students_list, name='students_list'),
]