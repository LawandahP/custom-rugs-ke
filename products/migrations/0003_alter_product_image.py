# Generated by Django 3.2.5 on 2021-08-26 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='staticImages/default-placeholder.jpg', null=True, upload_to='product/'),
        ),
    ]
