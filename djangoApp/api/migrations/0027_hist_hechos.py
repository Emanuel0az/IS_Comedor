# Generated by Django 5.1.1 on 2024-11-03 14:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_hist_pagos_activo'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hist_hechos',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('reporte', models.TextField(blank=True, null=True)),
                ('fecha_hecho', models.DateField(auto_now_add=True)),
                ('pago', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hechos', to='api.hist_pagos')),
                ('users_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.users')),
            ],
        ),
    ]
