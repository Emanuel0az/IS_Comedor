import csv

# Nombre del archivo original y del archivo de salida
input_file = r'C:\Users\Dell\Documents\xd\Estudiantes24_24_modified.csv'
output_file = r'C:\Users\Dell\Documents\xd\Estudiantes_bien_modified2.csv'

try:
    # Abrir el archivo original y el archivo de salida
    with open(input_file, mode='r', encoding='utf-8') as infile, open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
        reader = csv.reader(infile, delimiter=';')
        writer = csv.writer(outfile, delimiter=';', quoting=csv.QUOTE_MINIMAL)  # Cambia a QUOTE_MINIMAL

        for row in reader:
            # Agregar comillas alrededor de 'nombre' y 'edad'
            row[2] = f'"{row[2]}"'  # 'nombre' es la tercera columna (índice 2)
            row[6] = f'"{row[6]}"'  # 'edad' es la séptima columna (índice 6)
            writer.writerow(row)

    print("Archivo modificado guardado como:", output_file)

except FileNotFoundError as e:
    print("Error: El archivo no se encontró:", e)
except Exception as e:
    print("Se produjo un error:", e)


# from django.contrib.auth.models import User

# # Obtener al usuario (por ejemplo, por su nombre de usuario o email)
# user = User.objects.get(username='root')  # O también puedes usar .get(email='email@example.com')

# # Asignar permisos de administrador
# user.is_staff = True  # Para darle acceso al panel de administración
# user.is_superuser = True  # Para hacerlo superusuario con todos los permisos

# # Guardar los cambios
# user.save()
