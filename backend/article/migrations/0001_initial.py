# Generated by Django 5.0.3 on 2024-03-21 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_title', models.CharField(max_length=100)),
                ('translated_title', models.CharField(max_length=100)),
                ('original_content', models.TextField()),
                ('translated_content', models.TextField()),
                ('link_to_product', models.URLField()),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('visible', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]