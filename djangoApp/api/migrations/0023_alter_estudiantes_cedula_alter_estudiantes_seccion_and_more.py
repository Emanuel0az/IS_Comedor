# Generated by Django 5.1.1 on 2024-10-22 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_alter_estudiantes_rol'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estudiantes',
            name='cedula',
            field=models.CharField(max_length=50, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='estudiantes',
            name='seccion',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='estudiantes',
            name='telefono',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
