# Generated by Django 2.2 on 2019-06-05 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20190604_2037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='day',
            name='name',
            field=models.CharField(choices=[('SU', 'Sunday'), ('MO', 'Monday'), ('TU', 'Tuesday'), ('WE', 'Wednesday'), ('TH', 'Thursday'), ('FR', 'Friday'), ('SA', 'Saturday')], max_length=2),
        ),
    ]
