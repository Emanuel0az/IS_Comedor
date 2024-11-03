from rest_framework import serializers
from .models import Users, Recetas, Ingredientes, Hist_ingredientes, Estudiantes, Hist_pagos, Hist_hechos

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

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

class Hist_pagos_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Hist_pagos
        fields = '__all__'

class EstudiantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiantes
        fields = '__all__'
    pagos = Hist_pagos_Serializer(many=True, read_only=True)

class  Hist_hechosSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Hist_hechos
        fields =  '__all__'
    hechos = Hist_pagos_Serializer(many=True, read_only=True)


        
