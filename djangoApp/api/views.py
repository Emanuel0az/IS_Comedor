from django.http import JsonResponse
from django.db.models import Count
from .models import Asistencias, Estudiantes, Users, Recetas, Ingredientes, Hist_ingredientes,Asistencias
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UsersSerializer, RecetasSerializer, IngredientesSerializer, Hist_ingredientesSerializer, AsistenciasSerializer

from rest_framework import status
from .models import Users, Recetas, Compras, Donaciones, Hist_ingredientes, Ingredientes, Proveedores, Students
from .serializers import UsersSerializer, ComprasSerializer, RecetasSerializer, IngredientesSerializer, Hist_ingredientesSerializer, DonacionesSerializer, ProveedoresSerializer, StudentsSerializer


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def users_list(request, pk=None):
     # Si hay un ID en la URL, intenta obtener ese juguete en particular
    if pk:
        try:
            user = Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            return Response({"error": "Toy not found"}, status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        if pk:
            # Devolver solo el juguete con el `pk` proporcionado
            serializer = UsersSerializer(user)
            user = Users.objects.get(pk=pk)
            return Response(serializer.data)

        else:
            # Si no hay `pk`, devolver todos los juguetes
            user = Users.objects.all()
            serializer = UsersSerializer(user, many=True)
            return Response(serializer.data)
        
    elif request.method == 'POST':
        print(request.data)
        serializer = UsersSerializer(data=request.data)  # Crear una nueva instancia del serializador
        if serializer.is_valid():  # Verificar que los datos son válidos
            serializer.save()  # Guardar el nuevo juguete en la base de datos
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Retornar datos del nuevo juguete
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retornar errores sihay
    
    elif request.method == 'PUT':
        serializer = UsersSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
# ////////////////////////////////////////////////////////////////


# Función para la asistencia diaria
def asistencia_diaria(request):
    asistencias_por_dia = Asistencias.objects.values('fecha_asistencia').annotate(cantidad_asistencia=Count('estudiante')).order_by('fecha_asistencia')
    data = list(asistencias_por_dia)
    return JsonResponse(data, safe=False)

# Vistas de usuarios
@api_view(['GET', 'POST'])
def users_list(request):
    if request.method == 'GET':
        users = Users.objects.all()
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def users_detail(request, pk):
    user = get_object_or_404(Users, pk=pk)
    if request.method == 'GET':
        serializer = UsersSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UsersSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# Vista para listar y crear recetas
@api_view(['GET', 'POST'])
def recetas_list(request):
    if request.method == 'GET':
        recetas = Recetas.objects.all()
        serializer = RecetasSerializer(recetas, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = RecetasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def recetas_detail(request, pk):
    receta = get_object_or_404(Recetas, pk=pk)
    if request.method == 'GET':
        serializer = RecetasSerializer(receta)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = RecetasSerializer(receta, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        receta.delete()
        return Response({"message": "Receta deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# Vista para listar y crear ingredientes
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def ingredientes_list(request, pk=None):
    if pk:
        try:
            ingrediente = Ingredientes.objects.get(pk=pk)
        except Ingredientes.DoesNotExist:
            return Response({"error": "Ingrediente not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        if pk:
            serializer = IngredientesSerializer(ingrediente)
            return Response(serializer.data)
        else:
            ingredientes = Ingredientes.objects.all()
            serializer = IngredientesSerializer(ingredientes, many=True)
            return Response(serializer.data)
    elif request.method == 'POST':
        serializer = IngredientesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        serializer = IngredientesSerializer(ingrediente, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        ingrediente.delete()
        return Response({"message": "Ingrediente deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# Vista para el historial de ingredientes
@api_view(['GET', 'POST'])
def hist_ingredientes_list(request, pk=None):
    if pk:
        try:
            hist_ingrediente = Hist_ingredientes.objects.get(pk=pk)
        except Hist_ingredientes.DoesNotExist:
            return Response({"error": "Hist_ingrediente not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        if pk:
            serializer = Hist_ingredientesSerializer(hist_ingrediente)
            return Response(serializer.data)
        else:
            hist_ingredientes = Hist_ingredientes.objects.all()
            serializer = Hist_ingredientesSerializer(hist_ingredientes, many=True)
            return Response(serializer.data)
    elif request.method == 'POST':
        serializer = Hist_ingredientesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        serializer = Hist_ingredientesSerializer(hist_ingrediente, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        hist_ingrediente.delete()
        return Response({"message": "Hist_ingrediente deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def hist_ingredientes_detail(request, pk):
    ingrediente = get_object_or_404(Hist_ingredientes, pk=pk)
    serializer = Hist_ingredientesSerializer(ingrediente)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def asistencias_list(request):
    if request.method == 'GET':
        asistencias = Asistencias.objects.all()
        serializer = AsistenciasSerializer(asistencias, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AsistenciasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def asistencias_detail(request, pk):
    try:
        asistencia = Asistencias.objects.get(pk=pk)
    except Asistencias.DoesNotExist:
        return Response({'error': 'Asistencia no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AsistenciasSerializer(asistencia)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AsistenciasSerializer(asistencia, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':

        asistencia.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        proveedor.delete()
        return Response({"message": "Proveedor deleted successfully"}, status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def students_list(request, pk=None):
    if pk:
        try:
            students = Students.objects.get(pk=pk)
        except Students.DoesNotExist:
            return Response({"error": "Proveedor not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        if pk:
            serializer = StudentsSerializer(students)
            return Response(serializer.data)
        else:
            students = Students.objects.all()
            serializer = StudentsSerializer(students, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StudentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        serializer = StudentsSerializer(students, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        students.delete()
        return Response({"message": "Proveedor deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

