# Generated by Django 2.2 on 2019-05-02 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='minor',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]