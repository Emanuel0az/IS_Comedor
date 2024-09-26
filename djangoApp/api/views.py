# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Users
from .models import Toys
from .serializers import userSerializer
from.serializers import toysSerializer

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
            serializer = userSerializer(user)
            user = Users.objects.get(pk=pk)
            return Response(serializer.data)

        else:
            # Si no hay `pk`, devolver todos los juguetes
            user = Users.objects.all()
            serializer = userSerializer(user, many=True)
            return Response(serializer.data)
        
    elif request.method == 'POST':
        print(request.data)
        serializer = userSerializer(data=request.data)  # Crear una nueva instancia del serializador
        if serializer.is_valid():  # Verificar que los datos son válidos
            serializer.save()  # Guardar el nuevo juguete en la base de datos
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Retornar datos del nuevo juguete
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retornar errores sihay
    
    elif request.method == 'PUT':
        serializer = userSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
# ////////////////////////////////////////////////////////////////

    
@api_view(['Get', 'Post', 'Put', 'Delete'])
def toys_list(request, pk=None):
     # Si hay un ID en la URL, intenta obtener ese juguete en particular
    if pk:
        try:
            toy = Toys.objects.get(pk=pk)
        except Toys.DoesNotExist:
            return Response({"error": "Toy not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        if pk:
            # Devolver solo el juguete con el `pk` proporcionado
            serializer = toysSerializer(toy)
            toy = Toys.objects.get(pk=pk)
            return Response(serializer.data)
        else:
            # Si no hay `pk`, devolver todos los juguetes
            toy = Toys.objects.all()
            serializer = toysSerializer(toy, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        print(request.data)
        serializer = toysSerializer(data=request.data)  # Crear una nueva instancia del serializador
        if serializer.is_valid():  # Verificar que los datos son válidos
            serializer.save()  # Guardar el nuevo juguete en la base de datos
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Retornar datos del nuevo juguete
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retornar errores sihay
    
    elif request.method == 'PUT':
        serializer = toysSerializer(toy, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        toy.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)