from backend import models

from datetime import datetime
import io
from rest_framework.parsers import JSONParser

from django.db.models import Q
from functools import reduce
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Prefetch

from rest_framework import generics

from rest_framework import viewsets, permissions

from django.views import View;
from backend import serializers

# Base ViewSet
class TODOViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = serializers.UserSerializer

class AdvisorDetails(APIView):
  serializer_class = serializers.AdvisorSerializer
  def get_object(self,student): 
    try:
      user = models.User.objects.get(email=student)
      advisor = models.Advisor.objects.get(student_id=user.id)
      return advisor
    except models.Advisor.DoesNotExist:
      raise Http404
  def get(self, request, student):
    advisor = self.get_object(student)
    serializer = serializers.AdvisorSerializer(advisor)
    return Response(serializer.data)
  # No put - Student's Advisor should be deleted then readded to a new faculty
  def delete(self, request, student):
    advisor = self.get_object(student)
    advisor.delete()
    return Reponse(status=status.HTTP_204_NO_CONTENT)
class AdvisorList(APIView):
  def get_object(self,faculty):
    try:
      advisor = models.Advisor.objects.filter(faculty_id=faculty)
      return advisor
    except models.Advisor.DoesNotExist:
      raise Http404
  def get(self, request, faculty):
    advisor = self.get_object(faculty)
    serializer = serializers.AdvisorSerializer(advisor)
    return Response(serializer.data)
  def post(self, request):
    serializer = serializer.AdvisorSerializer(data=request.data)
    if serializer.is_valid:
      return Response(serializer.data,status=HTTP_201_CREATED)
    return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
class BuildingDetails(APIView):
  serializer_class = serializers.BuildingSerializer
  def get(self, request, code):
    try:
      building = models.Building.objects.get(code=code)
      serializer = serializers.BuildingSerializer(building)
      return Response(serializer.data)
    except Building.DoesNotExist:
      raise Http404
  # We wont need a put or a delete
@method_decorator(csrf_exempt, name='dispatch')
class BuildingList(generics.ListCreateAPIView):
  serializer_class = serializers.BuildingSerializer
  queryset = models.Building.objects.all()
  def list(self, request):
    queryset = self.get_queryset()
    serializer = serializers.BuildingSerializer(queryset, many=True)
    return Response(serializer.data)
  # def post is not needed.  No user will create a building
class CourseDetails(APIView):
  serializer_class = serializers.CourseSectionSerializer
  def get_object(self,id):
    try:
      course = models.Course.objects.get(id=id)
      return course
    except Course.DoesNotExist:
      raise Http404
  def get(self,request,id):
    course = self.get_object(id)
    serializer = serializers.CourseSerializer(course)
    return Response(serializer.data)
class CourseList(generics.ListCreateAPIView):
  serializer_class =serializers.CourseSerializer
  queryset = models.Course.objects.all()
  def list(self,requerst):
    queryset = self.get_queryset()
    serializer = serializers.CourseSerializer(queryset,many=True)
    return Response(serializer.data)
@method_decorator(csrf_exempt, name='dispatch')
class CourseSectionDetails(generics.RetrieveUpdateDestroyAPIView):
  def get_object(self,id):
    try:
      section = models.CourseSection.objects.get(id=id)
      return section
    except models.CourseSection.DoesNotExist:
      raise Http404
  def get(self, request,id):
    section = self.get_object(id)
    serializer = serializers.CourseSectionSerializer(section)
    return Response(serializer.data)
  def put(self, request,id):
    params = request.data
    if params.get('slot') is not None:
      queryset = models.CourseSection.objects.get(id = id)
      slot = models.Slot.objects.get(id = params.get('slot'))
      if not slot in queryset.slot.all():
        slot.isTaken = True
        slot.save()
        queryset.slot.add(slot)
      else:
        slot.isTaken = False
        slot.save()
        queryset.slot.remove(slot)
      queryset.save()
      serializer = serializers.CourseSectionSerializer(queryset)
      return Response(serializer.data)
    # if params.get('numOfSeats') is not None:
    #   data.append(Q(numOfSeats=params.get('numOfSeats')))
    queryset = self.get_object(id)
    if params.get('faculty') is not None:
      faculty = models.Faculty.objects.get(user_id=params.get('faculty'))
      # Get COurse Sections where faculty = this faculty
      # Get Course slot
      # Compare the time of slot
      queryset.faculty=faculty
      queryset.save()
    if params.get('numOfSeats') is not None:
      queryset.numOfSeats = params.get('numOfSeats')
      queryset.save()
    serializer = serializers.CourseSectionSerializer(queryset)
    return Response(serializer.data)
  def delete(self, request,id):
    queryset = self.get_object(id)
    queryset.delete()
    return Response({'isSuccessful': True}, status=status.HTTP_204_NO_CONTENT)
@method_decorator(csrf_exempt, name='dispatch')
class CourseSectionList(generics.ListCreateAPIView):
  serializer_class = serializers.CourseSectionSerializer
  def list(self, request):
    params = request.query_params
    try: 
      filters=[]
      days = []
      if params.get('courseID') is not None:
        filters.append(Q(course_id=int(params.get('courseID'))))
      if params.get('creditMin') is not None:
        filters.append(Q(course__numberOfCredits__gte=int(params.get('creditMin'))))
      if params.get('creditMax') is not None:
        filters.append(Q(course__numberOfCredits__lte=int(params.get('creditMax'))))
      if params.get('facultyLastName') is not None:
        filters.append(Q(faculty__user__lastName=params.get('facultyLastName')))
      if params.get('courseName') is not None:
        filters.append(Q(course__name__icontains=params.get('courseName')))
      if params.get('department') is not None:
        filters.append(Q(faculty__department=params.get('department')))
      if params.get('term') is not None:
        filters.append(Q(term_id=params.get('term')))
      if params.get('time') is not None:
        filters.append(Q(slot__time__id=params.get('time')))
      if params.get('monday') == 'false':
        days.append('1')
      if params.get('tuesday') == 'false':
        days.append('2')
      if params.get('wednesday') == 'false':
        days.append('3')
      if params.get('thursday') == 'false':
        days.append('4')
      if not filters and len(days) == 0:
        queryset = models.CourseSection.objects.all()
        serializer = serializers.CourseSectionSerializer(queryset, many=True)
        return Response(serializer.data)
      elif len(days) == 4:
        return Response('')
      else:
        queryset = None
        if len(days) == 0:
          queryset = models.CourseSection.objects.filter(reduce(Q.__and__,filters)).distinct()
        elif len(days) != 0:
          print(days)
        else: 
          queryset = models.CourseSection.objects.filter(reduce(Q.__and__,filters)).exclude(slot__day__id__in=days).distinct()
          print(queryset)
        serializer = serializers.CourseSectionSerializer(queryset, many=True)
        return Response(serializer.data)
    except models.CourseSection.DoesNotExist:
      raise Http404
class DayList(generics.ListCreateAPIView):
  serializer_class = serializers.DaySerializer()
  queryset = models.Day.objects.all()
class DepartmentDetails(generics.RetrieveUpdateDestroyAPIView):
  def get(self, request, code):
    try:
      department = models.Department.get(code=code)
      serializer = serializers.DepartmentSerializer(department)
      return Response(serializer.data)
    except Department.DoesNotExist:
      raise Http404
  #def put
  #def delete
class DepartmentList(generics.ListCreateAPIView):
  queryset = models.Department.objects.all()
  serializer_class = serializers.DepartmentSerializer
class EnrollmentList(generics.ListCreateAPIView):
  queryset = models.Enrollment.objects.all()
  serializer_class = serializers.EnrollmentSerializer
  def list(self,request):
    params = request.query_params
    print('begin')
    print(params.get('student'))
    if params.get('student') is not None:
      if params.get('term') is not None:
        print(params.get('term'))
        enrollment = models.Enrollment.objects.filter(student_id=params.get('student'),course_section__slot__term_id=params.get('term')).distinct()
        print(enrollment)
        serializer = serializers.EnrollmentSerializer(enrollment, many=True)
        return Response(serializer.data)
      else: 
        print('test')
        currentYear = datetime.today().year
        springStart = datetime(currentYear, 3, 20)
        springEnd = datetime(currentYear, 8, 20)
        fallStart = datetime(currentYear, 11, 20)
        fallEnd = datetime(currentYear+1, 1, 20)
        currentDay = datetime.today()
        term = None
        if springStart < currentDay < springEnd:
          term = models.Term.objects.get(year=currentYear, season="SP")
        if fallStart < currentDay < fallEnd:
          term = models.Term.objects.get(year=currentYear, season="F")
        enrollment = models.Enrollment.objects.filter(student_id=student.user_id, course_section__slot__term=term.id)
        print(enrollment)
        serializer = serializers.EnrollmentSerializer(enrollment, many=True)
        return Response(serializer.data)
        
    if params.get('section') is not None:

      enrollment = models.Enrollment.objects.filter(course_section=params.get('section'))
      serializer = serializers.EnrollmentSerializer(enrollment)
      return Response(serializer.data)
  def post(self,request):
    params = request.data
    if params.get('section') is not None:
      if params.get('student') is not None:
        user = models.User.objects.get(email=params.get('student'))
        student = models.Student.objects.get(user_id=user.id)
        section = models.CourseSection.objects.get(id = params.get('section'))
        enrollment = models.Enrollment.objects.create(student=student,course_section=section,dateEnrolled=datetime.now().date())
        enrollment = models.Enrollment.objects.get(id=enrollment.id)
        serializer = serializers.EnrollmentSerializer(enrollment)
        return Response(serializer.data)
        
    
# Skipped FullTime and PartTime Faculty
# Skipped HoldDetails.  Student Holds will be obtained from student
class FacultyDetails(APIView):
  def get_object(self,email):
    try:
      user = models.User.objects.get(email=email)
      faculty = models.Faculty.objects.get(user_id=user.id)
      return faculty
    except Faculty.DoesNotExist:
      raise Http404
  def get(self,request,email):
    faculty=self.get_object(email)
    serializer = serializers.FacultySerializer(faculty)
    return Response(serializer.data)
  # TODO Create put that allows faculty to change their office hours
@method_decorator(csrf_exempt, name='dispatch')
class FacultyList(generics.ListCreateAPIView):
  def list(self,request):
    params = request.query_params
    try:
      if params.get('department') != '':
        faculty = models.Faculty.objects.filter(department=params.get('department'))
        print(faculty)
        serializer = serializers.FacultySerializer(faculty, many=True)
        return Response(serializer.data)
    except models.Faculty.DoesNotExist:
      raise Http404
class HoldList(generics.ListCreateAPIView):
  queryset = models.Hold.objects.all()
  serializer_class = serializers.HoldSerializer
class RoomList(APIView):
  queryset = models.Room.objects.all()
  serializer_class = serializers.RoomSerializer
  def get(self,request):
    params = request.query_params
    if params.get('building') is not None:
      room = models.Room.objects.filter(building=params.get('building'))
      serializer = serializers.RoomSerializer(room, many=True)
      return Response(serializer.data)
    else:
      room = models.Room.objects.all()
      serializer = serializers.RoomSerializer(room)
      return Response(serializer.data)
class MajorList(generics.ListCreateAPIView):
  queryset = models.Major.objects.all()
  serializer_class = serializers.MajorSerializer
# Will probably not be used RoomDetails
@method_decorator(csrf_exempt, name='dispatch')
class StudentDetails(APIView):
  def get_object(self, email):
    try:
      user = models.User.objects.get(email=email)
      student = models.Student.objects.get(user_id=user.id)
      return student
    except models.Student.DoesNotExist:
      raise Http404
  def get(self, request, email):
    student = self.get_object(email)
    serializer = serializers.StudentSerializer(student)
    return Response(serializer.data)
  def put(self, request, email):
    params = request.data
    student = self.get_object(email)
    print(params.get('holdAdd'))
    print(params.get('holdDelete'))
    if params.get('holdAdd') is not None:
      hold = models.Hold.objects.get(name=params.get('holdAdd'))
      if not student.hold.filter(name=hold.name):
          hold = models.Hold.objects.get(name=params.get('holdAdd'))
          student.hold.add(hold)
          student.save()
    if params.get('holdDelete') is not None:
      hold = models.Hold.objects.get(name=params.get('holdDelete'))
      if student.hold.filter(name=hold.name):
        student.hold.remove(hold)
        student.save()
    if params.get('isUndergrad') != '' and params.get('isUndergrad') is not None:
      if student.isUndergrad:
        student.isUndergrad = False
        student.save()
      else:
        student.isUndergrad = True
        student.save()
    serializer = serializers.StudentSerializer(student)
    return Response(serializer.data)
  def delete(self, request, email):
    student = self.get_object(email)
    student.delete()
    return Response(status=HTTP_204_NO_CONTENT)

# Skipped all the Students
# Admin + Researcher + DepartmentChair is also needed for use cases
@method_decorator(csrf_exempt, name='dispatch')
class SlotDetails(APIView):
  def get_object(self,id):
    try:
      slot = models.Slot.objects.get(id=id)
      return slot
    except:
      raise Http404
  def get(self,request, id):
    slot = self.get_object(id)
    serializer = serializers.SlotSerializer(slot)
    return Response(serializer.data)
class SlotList(generics.ListCreateAPIView):
  def list(self,request):
    try: 
      params = request.query_params
      filters=[]
      days = []
      if params.get('time') is not None:
        filters.append(Q(time_id=params.get('time')))
      print(params.get('monday'))
      if params.get('monday') == 'false':
        print('1')
        days.append('1')
      if params.get('tuesday') == 'false':
        days.append('2')
      if params.get('wednesday') == 'false':
        days.append('3')
      if params.get('thursday') == 'false':
        days.append('4')
      if not filters and len(days) == 0:
        queryset = models.Slot.objects.all()
        serializer = serializers.SlotSerializer(queryset, many=True)
        return Response(serializer.data)
      else:
        queryset = None
        if len(days) == 0:
          queryset = models.Slot.objects.filter(reduce(Q.__and__,filters))
        else: 
          queryset = models.Slot.objects.filter(reduce(Q.__and__,filters)).exclude(day_id__in=days)
        serializer = serializers.SlotSerializer(queryset, many=True)
        return Response(serializer.data)
    except models.Slot.DoesNotExist:
      raise Http404
  # def post(self,request):
  #   days = models.Day.objects.all()
  #   times = models.Time.objects.all()
  #   rooms = models.Room.objects.all()
  #   terms = models.Term.objects.all()
  #   for day in days:
  #     for time in times:
  #       for room in rooms:
  #         for term in terms:
  #           slot = models.Slot.objects.create(day_id=day.id,room_id=room.id,term_id=term.id,time_id=time.id)
  #           serializer = serializers.SlotSerializer(data = slot)
  #   print('done')
  #   return Response(status=HTTP_201_CREATED)
    
class TermList(generics.ListCreateAPIView):
  serializer_class =serializers.TermSerializer
  queryset = models.Term.objects.all()
class TimeList(generics.ListCreateAPIView):
  serializer_class = serializers.TimeSerializer
  queryset = models.Time.objects.all()
@method_decorator(csrf_exempt, name='dispatch')
class UserDetails(APIView):
  def get(self, request, email):
    try:
      user = models.User.objects.get(email=email)
      serializer = serializers.UserSerializer(user)
      return Response(serializer.data)
    except User.DoesNotExist:
      raise Http404
  # Mimicks the attributes in models
  def put(self, request, email):
    params = request.data
    user = models.User.objects.get(email=email)
    if params.get('firstName') is not None:
      user.firstName = params.get('firstName')
    if params.get('lastName') is not None:
      user.lastName = params.get('lastName')
    if params.get('address') is not None:
      user.address = params.get('address')
    if params.get('city') is not None:
      user.city = params.get('city')
    if params.get('state') is not None:
      user.state = params.get('state')
    if params.get('country') is not None:
      user.country = params.get('country')
    if params.get('phoneNumber') is not None:
      user.phoneNumber = params.get('phoneNumber')
    if params.get('zipCode') is not None:
      user.zipCode = params.get('zipCode')
    if params.get('isLockout') is not None:
      print('test')
      if user.isLockout:
        user.isLockout = False
        print('1')
      else:
        user.isLockout = True
    user.save()
    serializer = serializers.UserSerializer(user)
    return Response(serializer.data)
  def delete(self, request,email):
    user = models.User.objects.get(email=email)
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
@method_decorator(csrf_exempt, name='dispatch')
class UserList(APIView):
  def list(self, request):
    user = models.User.objects.all()
    serializer = serializers.UserSerializer(user)
    return Response(serializer.data)
  def post(self, request):
    serializer = serializers.UserSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Reponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Prereq and below in models