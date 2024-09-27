from django.db import models

# Create your models here.

class Users(models.Model):
    users_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    mail = models.EmailField(max_length=255, null=True, blank=True)
    password = models.CharField(max_length=255, null=True, blank=True)
    rol = models.CharField(max_length=50, choices=[("admin", "Administrador"), ("cook", "Cocinero"), ("vol", "Voluntario")], null=True, blank=True)


class Proveedores(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    telefono = models.CharField(max_length=20, null=True, blank=True)
    direccion = models.CharField(max_length=255, null=True, blank=True)


class Compras(models.Model):
    id = models.AutoField(primary_key=True)
    proveedor_id = models.ForeignKey(Proveedores, on_delete=models.CASCADE)
    fecha_compra = models.DateField(null=True, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)


class Ingredientes(models.Model):
    ingredientes_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fecha_compra = models.DateField(null=True, blank=True)
    fecha_vencimiento = models.DateField(null=True, blank=True)


class Donaciones(models.Model):
    donaciones_id = models.AutoField(primary_key=True)
    nombre_donante = models.CharField(max_length=255, null=True, blank=True)
    tipo_donacion = models.CharField(max_length=50, choices=[("monetaria", "Monetaria"), ("alimento", "Alimento")], null=True, blank=True)
    monto_donacion = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    ingrediente_id = models.ForeignKey(Ingredientes, on_delete=models.CASCADE)
    cantidad_donada = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fecha_donacion = models.DateField(null=True, blank=True)
    descripcion_donacion = models.TextField(null=True, blank=True)


class Recetas(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    cantidad_uso = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)


class Hist_ingredientes(models.Model):
    hist_p_id = models.AutoField(primary_key=True)
    users_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)


# class Hist_admin_elim(models.Model):
#     hist_id = int
#     Users.id
#     agg


# Cuando se guarda manual, elimina manual o se edita manual, se requiere un guardado, un registro.