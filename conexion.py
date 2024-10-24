# import mysql.connector
# import csv

# try:
#     # Conectar a la base de datos MySQL
#     connection = mysql.connector.connect(
#         host="localhost",  # Cambia por tu host de MySQL
#         user="root",  # Cambia por tu usuario de MySQL
#         password="root",  # Cambia por tu contraseña de MySQL
#         database="django-react"  # Cambia por tu base de datos
#     )

#     # Crear un cursor para ejecutar consultas
#     cursor = connection.cursor()

#     # Paso 1: Agregar la columna 'rol' a la tabla, si no existe
#     try:
#         cursor.execute("ALTER TABLE api_estudiantes ADD COLUMN rol VARCHAR(10) DEFAULT 'estu'")
#     except mysql.connector.Error as err:
#         if err.errno == 1060:  # Código de error de columna duplicada
#             print("La columna 'rol' ya existe en la tabla.")
#         else:
#             print(f"Error al modificar la tabla: {err}")
#             raise  # Rellenar otros posibles errores en la tabla

#     # Paso 2: Actualizar todos los registros para asignarles el rol 'estu'
#     try:
#         cursor.execute("UPDATE api_estudiantes SET rol = 'estu'")
#         connection.commit()  # Asegúrate de guardar los cambios en la base de datos
#     except mysql.connector.Error as err:
#         print(f"Error al actualizar los registros: {err}")
#         raise

#     # Paso 3: Consultar los datos actualizados de la tabla
#     cursor.execute("SELECT * FROM api_estudiantes")

#     # Obtener los nombres de las columnas
#     column_names = [i[0] for i in cursor.description]

#     # Paso 4: Exportar los datos a un archivo CSV
#     with open('Estudiantes24.csv', mode='w', newline='', encoding='utf-8') as file:
#         writer = csv.writer(file)

#         # Escribir los nombres de las columnas en la primera fila del CSV
#         writer.writerow(column_names)

#         # Escribir las filas de datos de la tabla
#         for row in cursor:
#             writer.writerow(row)

#     print("La tabla ha sido actualizada y exportada exitosamente a 'tabla_exportada_con_rol.csv'")

# except mysql.connector.Error as err:
#     print(f"Error en la conexión o ejecución de MySQL: {err}")

# except Exception as e:
#     print(f"Error general: {e}")

# finally:
#     # Cerrar el cursor y la conexión si fueron creados
#     if 'cursor' in locals():
#         cursor.close()
#     if 'connection' in locals():
#         connection.close()




# import mysql.connector
# import pandas as pd

# def connect_to_database():
#     """Establece la conexión a la base de datos MySQL."""
#     try:
#         connection = mysql.connector.connect(
#             user="root",
#             host="localhost",
#             password="root",
#             database="django-react"
#         )
#         return connection
#     except mysql.connector.Error as err:
#         print(f"Error al conectar con la base de datos: {err}")
#         return None

# def add_rol_column(cursor):
#     """Agrega la columna 'rol' a la tabla si no existe."""
#     try:
#         cursor.execute("ALTER TABLE api_estudiantes ADD COLUMN rol VARCHAR(10) DEFAULT 'estu'")
#         print("Columna 'rol' agregada exitosamente.")
#     except mysql.connector.Error as err:
#         if err.errno == 1060:  # Error de columna duplicada
#             print("La columna 'rol' ya existe en la tabla.")
#         else:
#             raise

# def update_rol_column(cursor, connection):
#     """Actualiza la columna 'rol' para todos los estudiantes."""
#     try:
#         cursor.execute("UPDATE api_estudiantes SET rol = 'estu'")
#         connection.commit()
#         print("Los registros han sido actualizados exitosamente.")
#     except mysql.connector.Error as err:
#         print(f"Error al actualizar los registros: {err}")
#         raise

# def export_to_csv(cursor, file_name):
#     """Exporta los datos de la tabla a un archivo CSV usando pandas."""
#     try:
#         query = "SELECT * FROM api_estudiantes"
#         cursor.execute(query)

#         # Obtener los datos y nombres de las columnas
#         data = cursor.fetchall()
#         column_names = [i[0] for i in cursor.description]

#         # Crear un DataFrame con pandas
#         df = pd.DataFrame(data, columns=column_names)

#         # Exportar a CSV
#         df.to_csv(file_name, index=False, encoding='utf-8')
#         print(f"Datos exportados exitosamente a '{file_name}'")
#     except Exception as e:
#         print(f"Error al exportar los datos: {e}")
#         raise

# def main():
#     connection = connect_to_database()
#     if connection:
#         cursor = connection.cursor()

#         try:
#             # Paso 1: Agregar la columna 'rol' a la tabla
#             add_rol_column(cursor)

#             # Paso 2: Actualizar los registros con el rol 'estu'
#             update_rol_column(cursor, connection)

#             # Paso 3: Exportar los datos actualizados a un archivo CSV
#             export_to_csv(cursor, 'Estudiantes24.csv')

#         except Exception as e:
#             print(f"Error general: {e}")
        
#         finally:
#             # Cerrar el cursor y la conexión
#             cursor.close()
#             connection.close()

# if __name__ == "__main__":
#     main()


import csv

def modificar_csv(primer_archivo, segundo_archivo, archivo_salida):
    # Leer los nombres del segundo archivo y almacenarlos en un conjunto
    nombres_segundo_archivo = set()

    # Intentar leer el segundo archivo con diferentes codificaciones
    encodings = ['utf-8', 'latin-1', 'iso-8859-1']
    
    for encoding in encodings:
        try:
            with open(segundo_archivo, mode='r', encoding=encoding) as file2:
                reader2 = csv.reader(file2, delimiter=';')  # Cambia el delimitador si es necesario
                for row in reader2:
                    # Asumimos que el nombre completo está en la penúltima columna
                    if len(row) > 4:  # Asegúrate de que hay suficientes columnas
                        nombre = ' '.join(row[4:6]).strip()  # Concatenar apellido y nombre
                        nombres_segundo_archivo.add(nombre)
            break  # Si se lee correctamente, salimos del bucle
        except UnicodeDecodeError:
            print(f"No se pudo decodificar '{segundo_archivo}' con {encoding}, intentando con la siguiente...")

    print(f"Nombres en el segundo archivo: {nombres_segundo_archivo}")  # Imprimir nombres del segundo archivo

    # Modificar el primer archivo
    with open(primer_archivo, mode='r', encoding='utf-8') as file1, \
         open(archivo_salida, mode='w', encoding='utf-8', newline='') as outfile:
        
        reader1 = csv.reader(file1, delimiter=';')  # Cambia el delimitador si es necesario
        writer = csv.writer(outfile, delimiter=';')  # Cambia el delimitador si es necesario

        for row in reader1:
            # Asumimos que el nombre completo está en las primeras dos columnas
            if len(row) >= 3:  # Asegúrate de que hay suficientes columnas
                nombre_completo = ' '.join(row[0:2]).strip()  # Concatenar el nombre y apellido
                print(f"Procesando nombre: {nombre_completo}")  # Mensaje de depuración

                # Reemplazar \N por True si el nombre está en el segundo archivo
                if nombre_completo in nombres_segundo_archivo:
                    row = [True if cell == '\\N' else cell for cell in row]  # Cambiar \N por True
                    print(f"Se ha modificado la fila: {row}")  # Mensaje de depuración

            writer.writerow(row)

    print(f"El archivo modificado ha sido guardado como '{archivo_salida}'.")

# Rutas de los archivos
primer_archivo = r'C:\Users\Dell\Documents\xd\Estudiantes24_1.csv'  # Ruta del primer archivo
segundo_archivo = r'C:\Users\Dell\Documents\xd\Becados24.csv'  # Ruta del segundo archivo
archivo_salida = r'C:\Users\Dell\Documents\xd\archivo_modificado.csv'  # Ruta del archivo de salida

# Ejecutar la función
modificar_csv(primer_archivo, segundo_archivo, archivo_salida)
