# Generated by Django 5.1.1 on 2024-10-07 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_delete_students_rename_tiene_beca_estudiantes_becado_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='estudiantes',
            name='rol',
            field=models.CharField(blank=True, choices=[('estudiante', 'Estudiante'), ('profesor', 'Profesor')], max_length=50, null=True),
        ),
    ]
