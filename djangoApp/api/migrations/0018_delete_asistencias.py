# Generated by Django 5.1.1 on 2024-10-15 19:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_hist_pagos_estudiante_id'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Asistencias',
        ),
    ]
