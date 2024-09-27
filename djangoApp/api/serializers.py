from rest_framework import serializers
from .models import Users
from .models import Recetas
from .models import Compras
from .models import Ingredientes
from .models import Hist_ingredientes
from .models import Donaciones
from .models import Proveedores




class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['__all__']
                                                                    
class RecetasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recetas
        fields = ['__all__']

class ComprasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compras
        fields = ['__all__']

class IngredientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredientes
        fields = ['ingredientes_id', 'nombre', 'cantidad', 'fecha_compra', 'fecha_vencimiento']

class Hist_ingredientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hist_ingredientes
        fields = ['__all__']

class DonacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donaciones
        fields = ['__all__']

class ProveedoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedores
        fields = ['__all__']
