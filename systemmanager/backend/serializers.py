from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from backend.models import (User, Student, Building, Room, UndergradStudent, GradStudent, FullTimeUndergradStudent, PartTimeUndergradStudent,
    FullTimeGradStudent, PartTimeGradStudent, Department, Faculty, FullTimeFaculty, PartTimeFaculty, Advisor,
    Admin, Researcher, DepartmentChair, Major, Minor, Time, Term, Day, Slot, Course, CourseSection, Prerequisite,
    StudentMajor, StudentMinor, Enrollment, Transcript, Attendance, Hold, Grade)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ('__all__')

class RoomSerializer(serializers.ModelSerializer):
    building = BuildingSerializer(many=False)
    class Meta:
        model = Room
        fields = ('__all__')

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('__all__')

class FacultySerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    department = DepartmentSerializer(many=False)
    room = RoomSerializer(many=False)
    class Meta:
        model = Faculty
        fields = ('__all__')

class FullTimeFacultySerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(many=False)
    class Meta:
        model = FullTimeFaculty
        fields = ('__all__')

class PartTimeFacultySerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(many=False)
    class Meta:
        model = PartTimeFaculty
        fields = ('__all__')

class HoldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hold
        fields = ('__all__')

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    hold = HoldSerializer(many=True)
    class Meta:
        model = Student
        fields = ('__all__')
        depth = 1

class AdvisorSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(many=False)
    student = StudentSerializer(many=False)
    class Meta:
        model = Advisor
        fields = ('__all__')
        
class UndergradStudentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(many=False)
    class Meta:
        model = UndergradStudent
        fields = ('__all__')

class GradStudentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(many=False)
    class Meta:
        model = GradStudent
        fields = ('__all__')

class FullTimeUndergradStudentSerializer(serializers.ModelSerializer):
    undergrad = UndergradStudentSerializer(many=False)
    class Meta:
        model = FullTimeUndergradStudent
        fields = ('__all__')

class PartTimeUndergradStudentSerializer(serializers.ModelSerializer):
    undergrad = UndergradStudentSerializer(many=False)
    class Meta:
        model = PartTimeUndergradStudent
        fields = ('__all__')

class FullTimeGradStudentSerializer(serializers.ModelSerializer):
    grad = GradStudentSerializer(many=False)
    class Meta:
        model = FullTimeGradStudent
        fields = ('__all__')

class PartTimeGradStudentSerializer(serializers.ModelSerializer):
    grad = GradStudentSerializer(many=False)
    class Meta:
        model = PartTimeGradStudent
        fields = ('__all__')

class AdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    class Meta:
        model = Admin
        fields = ('__all__')

class ResearcherSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    class Meta:
        model = Researcher
        fields = ('__all__')

class DepartmentChairSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(many=False)
    department = DepartmentSerializer(many=False)
    class Meta:
        model = DepartmentChair
        fields = ('__all__')

class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ('__all__')

class TermSerializer(serializers.ModelSerializer):
    season = serializers.SerializerMethodField()
    def get_season(self,obj):
        return obj.get_season_display()
    class Meta:
        model = Term
        fields = ('__all__')

class DaySerializer(serializers.ModelSerializer):    
    name = serializers.SerializerMethodField()
    def get_name(self,obj):
        return obj.get_name_display()
    class Meta:
        model = Day
        fields = ('__all__')

class SlotSerializer(serializers.ModelSerializer):
    time = TimeSerializer(many=False)
    day = DaySerializer(many=False)
    room = RoomSerializer(many=False)
    term = TermSerializer(many=False)
    class Meta:
        model = Slot
        fields = ('__all__')
    # def get_day(self,obj):
    #     qset = models.Day.objects.filter(id = obj)
    #     return [DaySerializer(i).data for i in qset]

class CourseSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(many=False)
    class Meta:
        model = Course
        fields = ('__all__')

class CourseSectionSerializer(serializers.ModelSerializer):
    course = CourseSerializer(many=False)
    faculty = FacultySerializer(many=False)
    slot = SlotSerializer(read_only=True, many=True)
    class Meta:
        model = CourseSection
        fields = ('__all__')
        depth = 2

class PrerequisiteSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    class Meta:
        model = Prerequisite
        fields = ('__all__')

class MajorSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(many=False)
    class Meta:
        model = Major
        fields = ('__all__')

class MinorSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(many=False)
    class Meta:
        model = Minor
        fields = ('__all__')

class StudentMajorSerializer(serializers.ModelSerializer):
    student = StudentSerializer(many=True)
    major = MajorSerializer(many=False)
    class Meta:
        model = StudentMajor
        fields = ('__all__')

class StudentMinorSerializer(serializers.ModelSerializer):
    student = StudentSerializer(many=True)
    minor = MinorSerializer(many=False)
    class Meta:
        model = StudentMinor
        fields = ('__all__')

class EnrollmentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(many=False, required=True)
    course_section = CourseSectionSerializer(many=False, required=True)
    class Meta:
        model = Enrollment
        fields = ('student','course_section','dateEnrolled')

class TranscriptSerializer(serializers.ModelSerializer):
    student = StudentSerializer(many=False)
    course = CourseSerializer(many=False)
    class Meta:
        model = Transcript
        fields = ('__all__')

class AttendanceSerializer(serializers.ModelSerializer):
    enrollment = EnrollmentSerializer(many=False)
    class Meta:
        model = Attendance
        fields = ('__all__')

class GradeSerializer(serializers.ModelSerializer):
    student = StudentSerializer(many=False)
    courseSection = CourseSectionSerializer(many=False)
    class Meta:
        model = Grade
        fields = ('__all__')
