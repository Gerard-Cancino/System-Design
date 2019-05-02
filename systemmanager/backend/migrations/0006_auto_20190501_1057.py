# Generated by Django 2.2 on 2019-05-01 10:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_auto_20190501_0518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='advisor',
            name='faculty',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Faculty'),
        ),
        migrations.AlterField(
            model_name='advisor',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Student'),
        ),
        migrations.AlterField(
            model_name='day',
            name='name',
            field=models.CharField(choices=[('SU', 'Sunday'), ('MO', 'Monday'), ('TU', 'Tuesday'), ('WE', 'Wednesday'), ('TH', 'Thursday'), ('F', 'Friday'), ('SA', 'Saturday')], max_length=2),
        ),
    ]