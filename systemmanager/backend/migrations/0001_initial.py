# Generated by Django 2.2 on 2019-05-08 00:36

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=30, unique=True)),
                ('password', models.CharField(max_length=20)),
                ('type', models.CharField(choices=[('S', 'Student'), ('F', 'Faculty'), ('A', 'Administration'), ('R', 'Researcher')], max_length=1)),
                ('isLockout', models.BooleanField(default=False)),
                ('firstName', models.CharField(max_length=20)),
                ('lastName', models.CharField(max_length=20)),
                ('address', models.CharField(max_length=40)),
                ('city', models.CharField(max_length=20)),
                ('state', models.CharField(max_length=2)),
                ('country', models.CharField(max_length=20)),
                ('zipCode', models.CharField(max_length=10)),
                ('phoneNumber', models.CharField(max_length=13)),
            ],
            options={
                'db_table': 'user',
            },
        ),
        migrations.CreateModel(
            name='Building',
            fields=[
                ('code', models.CharField(max_length=4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'building',
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.CharField(max_length=5, primary_key=True, serialize=False)),
                ('number', models.CharField(max_length=5)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('numberOfCredits', models.IntegerField(max_length=1)),
                ('isGraduateCourse', models.BooleanField(default=False)),
                ('isActive', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'course',
            },
        ),
        migrations.CreateModel(
            name='CourseSection',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('number', models.IntegerField(max_length=3)),
                ('numOfSeats', models.IntegerField(null=True)),
                ('numOfTaken', models.IntegerField(default=0)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Course')),
            ],
            options={
                'db_table': 'course_section',
            },
        ),
        migrations.CreateModel(
            name='Day',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(choices=[('SU', 'Sunday'), ('MO', 'Monday'), ('TU', 'Tuesday'), ('WE', 'Wednesday'), ('TH', 'Thursday'), ('F', 'Friday'), ('SA', 'Saturday')], max_length=2)),
            ],
            options={
                'db_table': 'day',
            },
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('code', models.CharField(max_length=4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'department',
            },
        ),
        migrations.CreateModel(
            name='Hold',
            fields=[
                ('name', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=20)),
                ('description', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'hold',
            },
        ),
        migrations.CreateModel(
            name='Major',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('type', models.CharField(choices=[('BS', 'Bachelors of Science'), ('BA', 'Bachelors of Art')], max_length=2)),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Department')),
                ('requirement', models.ManyToManyField(to='backend.Course')),
            ],
            options={
                'db_table': 'major',
            },
        ),
        migrations.CreateModel(
            name='Minor',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Department')),
                ('requirement', models.ManyToManyField(to='backend.Course')),
            ],
            options={
                'db_table': 'minor',
            },
        ),
        migrations.CreateModel(
            name='Term',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('season', models.CharField(choices=[('SU', 'Summer'), ('F ', 'Fall'), ('W ', 'Winter'), ('SP', 'Spring'), ('F', 'Fall'), (' F', 'Fall'), ('W', 'Winter')], max_length=2)),
                ('year', models.CharField(max_length=4)),
            ],
            options={
                'db_table': 'term',
            },
        ),
        migrations.CreateModel(
            name='Time',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('start', models.TimeField()),
                ('end', models.TimeField()),
            ],
            options={
                'db_table': 'time',
            },
        ),
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'admin',
            },
        ),
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('isFullTime', models.BooleanField(default=True)),
                ('department', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.Department')),
            ],
            options={
                'db_table': 'faculty',
            },
        ),
        migrations.CreateModel(
            name='Researcher',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'researcher',
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('isUndergrad', models.BooleanField(default=True)),
                ('hold', models.ManyToManyField(to='backend.Hold')),
            ],
            options={
                'db_table': 'student',
            },
        ),
        migrations.CreateModel(
            name='Slot',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('day', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Day')),
                ('time', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Time')),
            ],
            options={
                'db_table': 'slot',
            },
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.CharField(max_length=9, primary_key=True, serialize=False)),
                ('number', models.IntegerField()),
                ('type', models.CharField(choices=[('L', 'Lab'), ('C', 'Class'), ('O', 'Office'), ('F', 'Faculty'), ('T', 'Theater')], max_length=1)),
                ('capacity', models.IntegerField()),
                ('building', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Building')),
            ],
            options={
                'db_table': 'room',
            },
        ),
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateEnrolled', models.DateField(default=datetime.datetime.now)),
                ('course_section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.CourseSection')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Student')),
            ],
            options={
                'db_table': 'enrollment',
                'unique_together': {('student', 'course_section')},
            },
        ),
        migrations.AddField(
            model_name='coursesection',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Room'),
        ),
        migrations.AddField(
            model_name='coursesection',
            name='slot',
            field=models.ManyToManyField(to='backend.Slot'),
        ),
        migrations.AddField(
            model_name='coursesection',
            name='term',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Term'),
        ),
        migrations.AddField(
            model_name='course',
            name='department',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Department'),
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('isPresent', models.BooleanField()),
                ('dayAttended', models.DateField(default=datetime.datetime.now)),
                ('enrollment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Enrollment')),
            ],
            options={
                'db_table': 'attendance',
            },
        ),
        migrations.CreateModel(
            name='FullTimeFaculty',
            fields=[
                ('faculty', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='backend.Faculty')),
            ],
            options={
                'db_table': 'full_time_faculty',
            },
        ),
        migrations.CreateModel(
            name='GradStudent',
            fields=[
                ('student', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='backend.Student')),
                ('isFullTime', models.BooleanField(default=True)),
            ],
            options={
                'db_table': 'grad_student',
            },
        ),
        migrations.CreateModel(
            name='PartTimeFaculty',
            fields=[
                ('faculty', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='backend.Faculty')),
            ],
            options={
                'db_table': 'part_time_faculty',
            },
        ),
        migrations.CreateModel(
            name='UndergradStudent',
            fields=[
                ('student', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='backend.Student')),
                ('isFullTime', models.BooleanField(default=True)),
            ],
            options={
                'db_table': 'undergrad_student',
            },
        ),
        migrations.CreateModel(
            name='Prerequisite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('requiredGrade', models.CharField(max_length=1)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='main_course', to='backend.Course')),
                ('prereq', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='prerequisite', to='backend.Course')),
            ],
            options={
                'db_table': 'prerequisite',
                'unique_together': {('course', 'prereq')},
            },
        ),
        migrations.AddField(
            model_name='faculty',
            name='room',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.Room'),
        ),
        migrations.CreateModel(
            name='DepartmentChair',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('faculty', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.Faculty')),
            ],
            options={
                'db_table': 'department_chair',
            },
        ),
        migrations.AddField(
            model_name='coursesection',
            name='faculty',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.Faculty'),
        ),
        migrations.CreateModel(
            name='FullTimeGradStudent',
            fields=[
                ('grad', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='backend.GradStudent')),
            ],
            options={
                'db_table': 'full_time_grad_student',
            },
        ),
        migrations.CreateModel(
            name='FullTimeUndergradStudent',
            fields=[
                ('undergrad', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='backend.UndergradStudent')),
            ],
            options={
                'db_table': 'full_time_undergrad_student',
            },
        ),
        migrations.CreateModel(
            name='PartTimeGradStudent',
            fields=[
                ('grad', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='backend.GradStudent')),
            ],
            options={
                'db_table': 'part_time_grad_student',
            },
        ),
        migrations.CreateModel(
            name='PartTimeUndergradStudent',
            fields=[
                ('undergrad', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='backend.UndergradStudent')),
            ],
            options={
                'db_table': 'part_time_undergrad_student',
            },
        ),
        migrations.CreateModel(
            name='Transcript',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gradeReceived', models.CharField(max_length=2)),
                ('year', models.IntegerField()),
                ('season', models.CharField(choices=[('SP', 'SPRING'), ('F', 'FALL')], max_length=1)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Student')),
            ],
            options={
                'db_table': 'transcript',
                'unique_together': {('student', 'course')},
            },
        ),
        migrations.CreateModel(
            name='StudentMinor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateDeclared', models.DateField(default=datetime.datetime.now)),
                ('minor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Minor')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Student')),
            ],
            options={
                'db_table': 'student_minor',
                'unique_together': {('student', 'minor')},
            },
        ),
        migrations.CreateModel(
            name='StudentMajor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateDeclared', models.DateField(default=datetime.datetime.now)),
                ('major', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Major')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Student')),
            ],
            options={
                'db_table': 'student_major',
                'unique_together': {('student', 'major')},
            },
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('M', 'Midterm'), ('F', 'Final')], max_length=1)),
                ('letterGrade', models.CharField(max_length=1)),
                ('course_section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.CourseSection')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Student')),
            ],
            options={
                'db_table': 'grade',
                'unique_together': {('student', 'course_section')},
            },
        ),
        migrations.CreateModel(
            name='Advisor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateAssigned', models.DateField(default=datetime.datetime.now, null=True)),
                ('faculty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Faculty')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Student')),
            ],
            options={
                'db_table': 'advisor',
                'unique_together': {('faculty', 'student')},
            },
        ),
    ]
