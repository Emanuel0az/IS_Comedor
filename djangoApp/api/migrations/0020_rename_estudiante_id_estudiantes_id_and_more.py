# Generated by Django 5.1.1 on 2024-10-21 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_estudiantes_almuerzo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='estudiantes',
            old_name='estudiante_id',
            new_name='id',
        ),
        migrations.RemoveField(
            model_name='estudiantes',
            name='almuerzo',
        ),
        migrations.AddField(
            model_name='estudiantes',
            name='apellidos',
            field=models.CharField(blank=True, max_length=70, null=True),
        ),
        migrations.AddField(
            model_name='estudiantes',
            name='cedula',
            field=models.CharField(max_length=20, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='estudiantes',
            name='fecha_nacimiento',
            field=models.CharField(max_length=70, null=True),
        ),
        migrations.AddField(
            model_name='estudiantes',
            name='telefono',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='estudiantes',
            name='becado',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='estudiantes',
            name='edad',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='estudiantes',
            name='nombre',
            field=models.CharField(max_length=70, null=True),
        ),
        migrations.AlterField(
            model_name='estudiantes',
            name='rol',
            field=models.CharField(choices=[('estu', 'Estudiante'), ('prof', 'Profesor')], max_length=5, null=True),
        ),
        migrations.AlterField(
            model_name='estudiantes',
            name='seccion',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]