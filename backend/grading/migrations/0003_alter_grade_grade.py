# Generated by Django 5.0.3 on 2024-03-28 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('grading', '0002_rename_grading_grade'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grade',
            name='grade',
            field=models.IntegerField(default=0),
        ),
    ]