# Generated by Django 5.0.3 on 2024-04-19 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0008_alter_userurlviewer_article_alter_userurlviewer_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='userurlviewer',
            name='ip',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
