# import csv
# import io

# def replace_ñ(input_file, output_file):
#     encodings = ['utf-8', 'latin-1', 'iso-8859-1', 'windows-1252']
    
#     for encoding in encodings:
#         try:
#             with io.open(input_file, 'r', encoding=encoding) as infile, \
#                  io.open(output_file, 'w', encoding='utf-8', newline='') as outfile:
#                 reader = csv.reader(infile, delimiter=';')
#                 writer = csv.writer(outfile, delimiter=';')
                
#                 for row in reader:
#                     new_row = [cell.replace('ñ', 'n').replace('Ñ', 'N') for cell in row]
#                     writer.writerow(new_row)
            
#             print(f"Proceso completado con codificación {encoding}. El nuevo archivo se ha guardado como 'Estudiantes_sin_ñ.csv'")
#             return  # Si llegamos aquí, la operación fue exitosa
#         except UnicodeDecodeError:
#             print(f"No se pudo decodificar con {encoding}, intentando con la siguiente...")
    
#     print("No se pudo decodificar el archivo con ninguna de las codificaciones intentadas.")

# # Rutas de los archivos
# input_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes.csv'
# output_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes_sin_ñ.csv'

# # Ejecutar la función
# replace_ñ(input_file, output_file)



# import csv
# import io
# import re  # Importamos re para trabajar con expresiones regulares

# def replace_ñ(input_file, output_file):
#     encodings = ['utf-8', 'latin-1', 'iso-8859-1', 'windows-1252']
    
#     # Expresiones regulares para eliminar "(s)" y "(es)"
#     pattern_singular = r'\(s\)'  # Busca y elimina "(s)"
#     pattern_plural = r'\(es\)'   # Busca y elimina "(es)"
    
#     for encoding in encodings:
#         try:
#             with io.open(input_file, 'r', encoding=encoding) as infile, \
#                  io.open(output_file, 'w', encoding='utf-8', newline='') as outfile:
#                 reader = csv.reader(infile, delimiter=';')
#                 writer = csv.writer(outfile, delimiter=';')
                
#                 for row in reader:
#                     # Reemplazar "(s)" y "(es)" por una cadena vacía en cada celda de la fila
#                     new_row = [re.sub(pattern_singular, '', cell).strip() for cell in row]
#                     new_row = [re.sub(pattern_plural, '', cell).strip() for cell in new_row]
#                     writer.writerow(new_row)
            
#             print(f"Proceso completado con codificación {encoding}. El nuevo archivo se ha guardado como 'Estudiantes_sin_parentesis.csv'")
#             return  # Si llegamos aquí, la operación fue exitosa
#         except UnicodeDecodeError:
#             print(f"No se pudo decodificar con {encoding}, intentando con la siguiente...")
    
#     print("No se pudo decodificar el archivo con ninguna de las codificaciones intentadas.")

# # Rutas de los archivos
# input_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes_sin_ñ.csv'
# output_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes_sin_parentesis.csv'

# # Ejecutar la función
# replace_ñ(input_file, output_file)


# import csv
# import io
# import re

# def clean_edad(input_file, output_file):
#     encodings = ['utf-8', 'latin-1', 'iso-8859-1', 'windows-1252']
    
#     # Patrón para reemplazar palabras o caracteres problemáticos
#     pattern_replace = r'ano|mes|meses|año|años'
    
#     for encoding in encodings:
#         try:
#             with io.open(input_file, 'r', encoding=encoding) as infile, \
#                  io.open(output_file, 'w', encoding='utf-8', newline='') as outfile:
#                 reader = csv.reader(infile, delimiter=';')
#                 writer = csv.writer(outfile, delimiter=';')
                
#                 for row in reader:
#                     # Reemplazar los textos problemáticos en la columna de edad
#                     new_row = [re.sub(pattern_replace, '', cell).strip() if i == 6 else cell for i, cell in enumerate(row)]
#                     writer.writerow(new_row)
            
#             print(f"Proceso completado con codificación {encoding}. El archivo limpiado se ha guardado como 'Estudiantes_limpio.csv'")
#             return
#         except UnicodeDecodeError:
#             print(f"No se pudo decodificar con {encoding}, intentando con la siguiente...")
    
#     print("No se pudo decodificar el archivo con ninguna de las codificaciones intentadas.")

# # Rutas de los archivos
# input_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes_sin_parentesis.csv'
# output_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes2.csv'

# # Ejecutar la función
# clean_edad(input_file, output_file)


# import csv
# import io
# import re

# def clean_edad(input_file, output_file):
#     encodings = ['utf-8', 'latin-1', 'iso-8859-1', 'windows-1252']
    
#     # Patrón para extraer solo el número antes de la palabra "y"
#     pattern_replace = r'(\d+)\s+y.*'
    
#     for encoding in encodings:
#         try:
#             with io.open(input_file, 'r', encoding=encoding) as infile, \
#                  io.open(output_file, 'w', encoding='utf-8', newline='') as outfile:
#                 reader = csv.reader(infile, delimiter=';')
#                 writer = csv.writer(outfile, delimiter=';')
                
#                 for row in reader:
#                     # Reemplazar el contenido de la columna de edad (índice 6)
#                     new_row = [re.sub(pattern_replace, r'\1', cell).strip() if i == 6 else cell for i, cell in enumerate(row)]
#                     writer.writerow(new_row)
            
#             print(f"Proceso completado con codificación {encoding}. El archivo limpiado se ha guardado como 'Estudiantes_limpio.csv'")
#             return
#         except UnicodeDecodeError:
#             print(f"No se pudo decodificar con {encoding}, intentando con la siguiente...")
    
#     print("No se pudo decodificar el archivo con ninguna de las codificaciones intentadas.")

# # Rutas de los archivos
# input_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes2.csv'
# output_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes3.csv'

# # Ejecutar la función
# clean_edad(input_file, output_file)


# import csv
# import io

# def concatenate_apellidos(input_file, output_file):
#     encodings = ['utf-8', 'latin-1', 'iso-8859-1', 'windows-1252']
    
#     for encoding in encodings:
#         try:
#             with io.open(input_file, 'r', encoding=encoding) as infile, \
#                  io.open(output_file, 'w', encoding='utf-8', newline='') as outfile:
                
#                 reader = csv.reader(infile, delimiter=';')
#                 writer = csv.writer(outfile, delimiter=';')
                
#                 for row in reader:
#                     # Concatenar el primer y segundo apellido en una sola columna
#                     concatenated_apellidos = row[1] + " " + row[2]  # Asumiendo que la columna 1 es el primer apellido y la columna 2 es el segundo apellido
#                     # Crear la nueva fila con los apellidos concatenados
#                     new_row = [row[0], concatenated_apellidos] + row[3:]  # row[0] es la cédula, row[3:] son los demás campos
#                     writer.writerow(new_row)
            
#             print(f"Proceso completado con codificación {encoding}. El nuevo archivo se ha guardado como '{output_file}'")
#             return  # Si llegamos aquí, la operación fue exitosa
#         except UnicodeDecodeError:
#             print(f"No se pudo decodificar con {encoding}, intentando con la siguiente...")
    
#     print("No se pudo decodificar el archivo con ninguna de las codificaciones intentadas.")

# # Rutas de los archivos
# input_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes3.csv'
# output_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes_apellidos_concatenados.csv'

# # Ejecutar la función
# concatenate_apellidos(input_file, output_file)


# import mysql.connector
# import csv

# # Conectar a la base de datos MySQL
# connection = mysql.connector.connect(
#     host="localhost",  # Host de MySQL (puede ser 'localhost' o el nombre del contenedor en Docker)
#     user="root",   # Usuario de MySQL
#     password="root",  # Contraseña de MySQL
#     database="django-react"  # Nombre de la base de datos
# )

# # Crear un cursor para ejecutar consultas
# cursor = connection.cursor()

# # Consulta para seleccionar todos los registros de la tabla
# tabla_nombre = 'api_estudiantes'  # Cambia este nombre por el de tu tabla
# cursor.execute(f"SELECT * FROM {tabla_nombre}")

# # Obtener todos los registros
# rows = cursor.fetchall()

# # Obtener los nombres de las columnas
# column_names = [i[0] for i in cursor.description]

# # Ruta y nombre del archivo CSV
# csv_file = 'Estudiantes24.csv'

# # Escribir los datos en un archivo CSV
# with open(csv_file, mode='w', newline='', encoding='utf-8') as file:
#     writer = csv.writer(file)

#     # Escribir los nombres de las columnas en la primera fila del CSV
#     writer.writerow(column_names)

#     # Escribir las filas de datos de la tabla
#     writer.writerows(rows)

# # Cerrar el cursor y la conexión
# cursor.close()
# connection.close()

# print(f"Los datos de la tabla {tabla_nombre} han sido exportados a {csv_file} exitosamente.")



# import csv
# import io

# def concatenate_apellidos(input_file, output_file):
#     encodings = ['utf-8', 'latin-1', 'iso-8859-1', 'windows-1252']
    
#     for encoding in encodings:
#         try:
#             with io.open(input_file, 'r', encoding=encoding) as infile, \
#                  io.open(output_file, 'w', encoding='utf-8', newline='') as outfile:
                
#                 reader = csv.reader(infile, delimiter=';')
#                 writer = csv.writer(outfile, delimiter=';')
                
#                 for row in reader:
#                     # Concatenar el primer y segundo apellido en una sola columna
#                     concatenated_apellidos = row[1] + " " + row[2]  # Asumiendo que la columna 1 es el primer apellido y la columna 2 es el segundo apellido
#                     # Crear la nueva fila con los apellidos concatenados, eliminando la primera columna (row[0])
#                     new_row = [concatenated_apellidos] + row[3:]  # row[3:] son los demás campos, sin incluir la primera columna
#                     writer.writerow(new_row)
            
#             print(f"Proceso completado con codificación {encoding}. El nuevo archivo se ha guardado como '{output_file}'")
#             return  # Si llegamos aquí, la operación fue exitosa
#         except UnicodeDecodeError:
#             print(f"No se pudo decodificar con {encoding}, intentando con la siguiente...")
    
#     print("No se pudo decodificar el archivo con ninguna de las codificaciones intentadas.")

# # Rutas de los archivos
# input_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes24.csv'
# output_file = r'\\wsl.localhost\docker-desktop\var\lib\mysql-files\Estudiantes24_1.csv'

# # Ejecutar la función
# concatenate_apellidos(input_file, output_file)


import csv

# Nombre del archivo original y del archivo de salida
input_file = 'C:/Users/Dell/Documents/xd/archivo_modificado.csv'
output_file = 'C:/Users/Dell/Documents/xd/Estudiantes24_24_modified.csv'


# Abrir el archivo original y el archivo de salida
with open(input_file, mode='r', encoding='utf-8') as infile, open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
    reader = csv.reader(infile, delimiter=';')
    writer = csv.writer(outfile, delimiter=';', quoting=csv.QUOTE_ALL)

    for row in reader:
        # Eliminar saltos de línea y espacios adicionales en el número de teléfono
        row[7] = row[7].replace('\n', '').strip()  # Aquí se asume que 'telefono' es la octava columna (índice 7)
        writer.writerow(row)

print("Archivo modificado guardado como:", output_file)
