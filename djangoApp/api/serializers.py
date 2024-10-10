from rest_framework import serializers

from .models import Users, Recetas, Ingredientes, Hist_ingredientes, Asistencias,Estudiantes, Hist_pagos


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__All__'

class RecetasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recetas
        fields = ['id', 'nombre', 'descripcion', 'cantidad_uso']


class IngredientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredientes
        fields = ['ingredientes_id', 'nombre', 'cantidad', 'fecha_vencimiento']

class Hist_ingredientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hist_ingredientes
        fields = ['hist_p_id', 'users_id', 'nombre', 'cantidad']

class EstudiantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiantes
        fields = ['estudiante_id', 'nombre', 'edad', 'seccion', 'becado', 'rol']

class AsistenciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencias
        fields = ['asistencia_id', 'estudiante_id', 'fecha_asistencia']
class Meta:
        model = Asistencias
        fields = ['asistencia_id', 'estudiante_id', 'fecha_asistencia']

class Hist_pagos_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Hist_pagos
        fields = ['id_pago', 'estudiante_id', 'fecha_pago', 'monto', 'fecha_pago_prueba']
