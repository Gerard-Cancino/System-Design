from django.contrib.auth.models import AbstractBaseUser
from django.db import models

from datetime import datetime

# Base User is active
# isFaculty
# Create your models here.

class UserAccountManager(models.Manager):
    def create_user(self,email,password, **extra_fields):
      if not email:
        return ValueError(_("The email must be set"))
      email = self.normalize_email(email)
      user = self.model(email=email, **extra_fields)
      user.set_password(password)
      user.save()
      return user
    def create_superuser(self,email,password):
      user = self.create_user(email,password=password)
    def get_by_natural_key(self, email):
      return self.get(email=email)

class User(AbstractBaseUser):
    USERNAME_FIELD = 'email'
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=40, unique=True)
    password = models.CharField(max_length=256)
    TYPE = (
        ('S', 'Student'),
        ('F', 'Faculty'),
        ('A', 'Administration'),
        ('R', 'Researcher'),
    )
    type = models.CharField(max_length=1, choices=TYPE)
    isLockout = models.BooleanField(default=False)
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    address = models.CharField(max_length=40)
    city = models.CharField(max_length=20)
    state = models.CharField(max_length=2) # This needs to be a choice like above
    # ^ only applicable if user is part of the US
    country = models.CharField(max_length=20)
    zipCode = models.CharField(max_length=10)
    phoneNumber = models.CharField(max_length=13)
    second_email = models.CharField(max_length=40, default=None, null=False)

    objects = UserAccountManager()
    class Meta:
        db_table = "user"

class Building(models.Model):
    code = models.CharField(max_length=4, primary_key=True)
    name = models.CharField(max_length=40)
    class Meta:
        db_table = "building"

class Room(models.Model):
    REQUIRED_FIELDS = ('Building')
    id = models.CharField(primary_key=True, max_length=9)
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    number = models.IntegerField()
    TYPE = (
        ('L', 'Lab'),
        ('C', 'Class'),
        ('O', 'Office'),
        ('F', 'Faculty'),
        ('T', 'Theater')
    )
    type = models.CharField(max_length=1, choices=TYPE)
    capacity = models.IntegerField()
    class Meta:
        db_table = "room"

class Department(models.Model):
    code = models.CharField(max_length=4, primary_key=True)
    name = models.CharField(max_length=40)
    class Meta:
        db_table = "department"

class Faculty(models.Model):
    REQUIRED_FIELDS = ('User','Department',)
    user = models.ForeignKey(User, on_delete=models.CASCADE, primary_key=True)
    department = models.ForeignKey(Department, null=True, on_delete=models.SET_NULL)
    room = models.ForeignKey(Room, null=True, on_delete=models.SET_NULL)
    isFullTime = models.BooleanField(default=True)
    class Meta:
        db_table = "faculty"

class FullTimeFaculty(models.Model):
    REQUIRED_FIELDS = ('Faculty',)
    faculty = models.OneToOneField(Faculty, on_delete=models.CASCADE, primary_key=True)
    class Meta:
        db_table = "full_time_faculty"

class PartTimeFaculty(models.Model):
    REQUIRED_FIELDS = ('Faculty',)
    faculty = models.OneToOneField(Faculty, on_delete=models.CASCADE, primary_key=True)
    class Meta:
        db_table = "part_time_faculty"

class Hold(models.Model):
    name = models.CharField(max_length=20, primary_key=True)
    type = models.CharField(max_length=20)
    description = models.CharField(max_length=50)
    class Meta:
        db_table = "hold"

class Student(models.Model):
    REQUIRED_FIELDS = ('User',)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    isUndergrad = models.BooleanField(default=True)
    hold = models.ManyToManyField(Hold)
    class Meta:
        db_table = "student"

class Advisor(models.Model):
    REQUIRED_FIELDS = ('faculty',)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    dateAssigned = models.DateField(null=True, default=datetime.now)
    class Meta:
        db_table = "advisor"
        unique_together=(('faculty','student'))

class UndergradStudent(models.Model):
    REQUIRED_FIELDS = ('Student',)
    student = models.OneToOneField(Student, on_delete=models.CASCADE, primary_key=True)
    isFullTime = models.BooleanField(default=True)
    class Meta:
        db_table = "undergrad_student"

class GradStudent(models.Model):
    REQUIRED_FIELDS = ('Student',)
    student = models.OneToOneField(Student, on_delete=models.CASCADE, primary_key=True)
    isFullTime = models.BooleanField(default=True)
    class Meta:
        db_table = "grad_student"

class FullTimeUndergradStudent(models.Model):
    REQUIRED_FIELDS = ('UndergradStudent',)
    undergrad = models.OneToOneField(UndergradStudent, on_delete=models.CASCADE, primary_key=True)
    class Meta:
        db_table = "full_time_undergrad_student"

class PartTimeUndergradStudent(models.Model):
    REQUIRED_FIELDS = ('UndergradStudent',)
    undergrad = models.OneToOneField(UndergradStudent, on_delete=models.CASCADE, primary_key=True)
    class Meta:
        db_table = "part_time_undergrad_student"

class FullTimeGradStudent(models.Model):
    REQUIRED_FIELDS = ('GradStudent',)
    grad = models.OneToOneField(GradStudent, on_delete=models.CASCADE, primary_key=True)
    class Meta:
        db_table = "full_time_grad_student"

class PartTimeGradStudent(models.Model):
    REQUIRED_FIELDS = ('GradStudent',)
    grad = models.OneToOneField(GradStudent, on_delete=models.CASCADE, primary_key=True)
    class Meta:
        db_table = "part_time_grad_student"

class Admin(models.Model):
    REQUIRED_FIELDS = ('User',)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    class Meta:
        db_table = "admin"

class Researcher(models.Model):
    REQUIRED_FIELDS = ('User',)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    class Meta:
        db_table = "researcher"

class DepartmentChair(models.Model):
    REQUIRED_FIELDS = ('Faculty','Department')
    faculty = models.OneToOneField(Faculty, null=True, on_delete=models.SET_NULL)
    class Meta:
        db_table = "department_chair"

class Time(models.Model):
    id = models.IntegerField(primary_key=True)
    start = models.TimeField(null=False)
    end = models.TimeField(null=False)
    class Meta:
        db_table = "time"

class Term(models.Model):
    id = models.IntegerField(primary_key=True)
    SEASON_CHOICE = (
        ("SU", "Summer"),
        ("F ", "Fall"),
        ("W ", "Winter"),
        ("SP", "Spring"),
        ("F", "Fall"),
        (" F", "Fall"),
        ("W", "Winter"),
    )
    season = models.CharField(max_length=2, choices=SEASON_CHOICE, null=False)
    year = models.CharField(max_length=4, null=False)
    class Meta:
        db_table = "term"

class Day(models.Model):
    id = models.IntegerField(primary_key=True)
    DAY_TYPE = (
      ("SU", "Sunday"),
      ("MO", "Monday"),
      ("TU", "Tuesday"),
      ("WE", "Wednesday"),
      ("TH", "Thursday"),
      ('F',"Friday"),
      ("SA", "Saturday")
    )
    name = models.CharField(choices=DAY_TYPE, max_length=2, null=False)
    class Meta:
        db_table = "day"

class Slot(models.Model):
    id = models.AutoField(primary_key=True)
    time = models.ForeignKey(Time, on_delete=models.CASCADE)
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    class Meta:
        db_table = "slot"

class Course(models.Model):
    REQUIRED_FIELDS = ('Department',)
    id = models.CharField(max_length=5, primary_key=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    number = models.CharField(max_length=5, null=False)
    name = models.CharField(max_length=200, null=False, unique=True)
    description = models.TextField(null=False)
    numberOfCredits = models.IntegerField(max_length=1, null=False)
    isGraduateCourse = models.BooleanField(default=False, null=False)
    isActive = models.BooleanField(default=False, null=False)
    isInCatalog = models.BooleanField(default=False, null=False)
    class Meta:
        db_table = "course"

class CourseSection(models.Model):
    REQUIRED_FIELDS = ('Course',)
    id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    number = models.IntegerField(max_length=3)
    faculty = models.ForeignKey(Faculty, null=True, on_delete=models.SET_NULL)
    slot = models.ManyToManyField(Slot)
    numOfSeats = models.IntegerField(null=True)
    numOfTaken = models.IntegerField(default=0)
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    class Meta:
        db_table = "course_section"
        unique_together = ("id","term")

class Prerequisite(models.Model):
    REQUIRED_FIELDS = ('Course')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='main_course')
    prereq = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='prerequisite')
    requiredGrade = models.CharField(max_length=1)
    class Meta:
        db_table = "prerequisite"
        unique_together = ('course', 'prereq')

class Major(models.Model):
    REQUIRED_FIELDS = ('Department',)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    requirement = models.ManyToManyField(Course)
    TYPE = (
        ('BS', 'Bachelors of Science'),
        ('BA', 'Bachelors of Art'),
    )
    type = models.CharField(max_length=2, choices=TYPE)
    class Meta:
        db_table = "major"

class Minor(models.Model):
    REQUIRED_FIELDS = ('Department',)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    requirement = models.ManyToManyField(Course)
    class Meta:
        db_table = "minor"

class StudentMajor(models.Model):
    REQUIRED_FIELDS = ('Student', 'Major')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    major = models.ForeignKey(Major, on_delete=models.CASCADE)
    dateDeclared = models.DateField(default=datetime.now)
    class Meta:
        unique_together = (("student","major"))
        db_table = "student_major"

class StudentMinor(models.Model):
    REQUIRED_FIELDS = ('Student', 'Major')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    minor = models.ForeignKey(Minor, on_delete=models.CASCADE)
    dateDeclared = models.DateField(default=datetime.now)
    class Meta:
        unique_together = (("student", "minor"))
        db_table = "student_minor"

class Enrollment(models.Model):
    REQUIRED_FIELDS = ('Student', 'CourseSection')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course_section = models.ForeignKey(CourseSection, on_delete=models.CASCADE)
    dateEnrolled = models.DateField(default=datetime.now)
    class Meta:
        unique_together = ("student","course_section")
        db_table = "enrollment"

class Transcript(models.Model):
    REQUIRED_FIELDS = ('Student', 'Course')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    gradeReceived = models.CharField(max_length=2,null=True)
    year = models.IntegerField()
    SEASON = (
        ('SP','Spring'),
        ('F','Fall'),
    )
    season = models.CharField(max_length=2, choices=SEASON)
    class Meta:
        unique_together = (("student","course","year",'season'))
        db_table = "transcript"

class Attendance(models.Model):
    REQUIRED_FIELDS = ('Enrollment')
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    isPresent = models.BooleanField()
    dayAttended = models.DateField(default=datetime.now)
    class Meta:
        db_table = "attendance"
        unique_together = (('enrollment','dayAttended'))

class Grade(models.Model):
    REQUIRED_FIELDS = ('Student', 'CourseSection', 'type')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course_section = models.ForeignKey(CourseSection, on_delete=models.CASCADE)
    TEST_NAME = (
      ('M', 'Midterm'),
      ('F', 'Final'),
    )
    type = models.CharField(max_length=1, choices=TEST_NAME)
    letterGrade = models.CharField(max_length=1)
    class Meta:
        unique_together = (("student","course_section","type"))
        db_table = "grade"
