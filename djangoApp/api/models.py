from django.db import models

class Users(models.Model):
    users_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    mail = models.EmailField(max_length=255, null=True, blank=True)
    password = models.CharField(max_length=255, null=True, blank=True)
    rol = models.CharField(max_length=50, choices=[("admin", "Administrador"), ("cook", "Cocinero"), ("vol", "Voluntario")], null=True, blank=True)

class Estudiantes(models.Model):
    estudiante_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    edad = models.IntegerField(null=True, blank=True)
    seccion = models.CharField(max_length=50, null=True, blank=True)
    becado = models.BooleanField(default=False)
    rol = models.CharField(max_length=50, choices=[("estudiante", "Estudiante"), ("profesor", "Profesor")], null=True, blank=True)

class Asistencias(models.Model):
    asistencia_id = models.AutoField(primary_key=True)
    estudiante_id = models.ForeignKey(Estudiantes, on_delete=models.CASCADE)
    fecha_asistencia = models.DateField(auto_now_add=True)

class Ingredientes(models.Model):
    ingredientes_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fecha_vencimiento = models.DateField(null=True, blank=True)

class Recetas(models.Model):
    receta_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    ingredientes = models.ManyToManyField(Ingredientes, through='RecetaIngredientes')

class RecetaIngredientes(models.Model):
    receta = models.ForeignKey(Recetas, on_delete=models.CASCADE)
    ingrediente = models.ForeignKey(Ingredientes, on_delete=models.CASCADE)
    cantidad_uso = models.DecimalField(max_digits=10, decimal_places=2)

class Hist_ingredientes(models.Model):
    hist_p_id = models.AutoField(primary_key=True)
    users_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

class  Hist_pagos(models.Model):
    id_pago = models.AutoField(primary_key=True)
    estudiante_id = models.ForeignKey(Estudiantes, on_delete=models.CASCADE)
    fecha_pago = models.DateField(auto_now_add=True)
    fecha_pago_prueba = models.DateField(null=True, blank=True)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
