# Generated by Django 5.1.1 on 2024-10-09 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_hist_pagos'),
    ]

    operations = [
        migrations.AddField(
            model_name='hist_pagos',
            name='fecha_pago_prueba',
            field=models.DateField(blank=True, null=True),
        ),
    ]