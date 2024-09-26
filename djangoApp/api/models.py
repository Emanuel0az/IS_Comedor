from django.db import models

# Create your models here.

class Users(models.Model):
    users_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    mail =  models.EmailField(max_length=255)
    password = models.CharField(max_length=255)
    rol = models.CharField(max_length=50,choices=[("admin", "Administrador"), ("cook", "Cocinero"), ("vol", "Voluntario")])
    

class Proveedores(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=255)
    
    
class Compras(models.Model):
    id = models.AutoField(primary_key=True)
    proveedor_id = models.ForeignKey(Proveedores, on_delete=models.CASCADE)
    fecha_compra = models.DateField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    

class Ingredientes(models.Model):
    ingredientes_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_compra = models.DateField()
    fecha_vencimiento = models.DateField()
    
    
class Donaciones(models.Model):
    donaciones_id = models.AutoField(primary_key=True)
    nombre_donante = models.CharField(max_length=255)
    tipo_donacion = models.CharField(max_length=50, choices=[("monetaria", "Monetaria"), ("alimento", "Alimento")])
    monto_donacion = models.DecimalField(max_digits=10, decimal_places=2)
    ingrediente_id = models.ForeignKey(Ingredientes, on_delete=models.CASCADE)
    cantidad_donada = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_donacion = models.DateField()
    descripcion_donacion = models.TextField()
    
    
class Recetas(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    cantidad_uso = models.DecimalField(max_digits=10, decimal_places=2)


class Hist_ingredientes(models.Model):
    hist_p_id = models.AutoField(primary_key=True)
    users_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)


class Hist_admin(models.Model):
    hist_id = int
    Users.id
    agg
