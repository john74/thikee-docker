# Generated by Django 4.2.3 on 2023-07-27 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('search_engines', '0002_searchengine_is_default'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='searchengine',
            options={'ordering': [models.Case(models.When(name__icontains='Google', then=models.Value('A')), default=models.Value('B'), output_field=models.CharField()), 'name'], 'verbose_name_plural': 'Search Engines'},
        ),
        migrations.AlterField(
            model_name='searchengine',
            name='name',
            field=models.CharField(help_text='Search engine name e.g. Google', max_length=50, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='searchengine',
            name='url',
            field=models.URLField(help_text='The url of the search engine plus the value of the action attribute of the form e.g. https://www.google.com<b>/search</b>', max_length=1000, verbose_name='Action URL'),
        ),
    ]
