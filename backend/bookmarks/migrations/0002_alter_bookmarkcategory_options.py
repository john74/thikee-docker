# Generated by Django 4.2.3 on 2023-07-21 10:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookmarks', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bookmarkcategory',
            options={'ordering': ['name'], 'verbose_name_plural': 'Categories'},
        ),
    ]
