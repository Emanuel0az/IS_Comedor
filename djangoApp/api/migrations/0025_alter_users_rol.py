# Generated by Django 5.1.1 on 2024-10-30 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_alter_estudiantes_rol'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='rol',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]