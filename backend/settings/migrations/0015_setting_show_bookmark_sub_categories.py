# Generated by Django 4.2.3 on 2023-11-19 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('settings', '0014_remove_setting_weather_data_refresh_interval_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='setting',
            name='show_bookmark_sub_categories',
            field=models.BooleanField(default=True, help_text='If checked, bookmarks will be organized under subcategories within the category.', verbose_name='Show bookmark sub categories'),
        ),
    ]
