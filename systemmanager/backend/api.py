from backend import models

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
    except Advisor.DoesNotExist:
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
    except Advisor.DoesNotExist:
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
class BuildingList(APIView):
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
    serializer = serializers.CourseSectionSerializer(queryset)
    return Response(serializer.data)
  def put(self, request,id):
    if params.get('slot') != '' or params.get('slot') is None:
      queryset = models.CourseSection.objects.get(id = params.get('section'))
      slot = models.Slot.objects.get(id = params.get('slot'))
      if not slot in queryset.slot.all():
        queryset.Slot.add(slot)
      else:
        queryset.Slot.remove(slot)
      serializer = serializers.CourseSectionSerializer(queryset)
      if serializer.is_valid:
        serializer.save()
        return Response(serializer.data)
      return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
  def delete(self, request,id):
    queryset = models.CourseSection.objects.get(id = id).delete()
    return Response(status=HTTP_204_NO_CONTENT)
class CourseSectionList(generics.ListCreateAPIView):
  serializer_class = serializers.CourseSectionSerializer
  def list(self, request):
    params = request.query_params
    try: 
      filters=[]
      days = []
      if params.get('courseID') != '':
        filters.append(Q(course_id=int(params.get('courseID'))))
      if params.get('creditMin') != '':
        filters.append(Q(course__numberOfCredits__gte=int(params.get('creditMin'))))
      if params.get('creditMax') != '':
        filters.append(Q(course__numberOfCredits__lte=int(params.get('creditMax'))))
      if params.get('facultyLastName') != '':
        filters.append(Q(faculty__user__lastName=params.get('facultyLastName')))
      if params.get('courseName') != '':
        filters.append(Q(course__name__icontains=params.get('courseName')))
      if params.get('department') != '':
        filters.append(Q(faculty__department=params.get('department')))
      if params.get('term') != '':
        filters.append(Q(term_id=params.get('term')))
      if params.get('time') != '':
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
          queryset = models.CourseSection.objects.filter(reduce(Q.__and__,filters))
        elif len(days) != 0:
          print(days)
        else: 
          queryset = models.CourseSection.objects.filter(reduce(Q.__and__,filters)).exclude(slot__day__id__in=days)
          print(queryset)
        serializer = serializers.CourseSectionSerializer(queryset, many=True)
        return Response(serializer.data)
    except CourseSection.DoesNotExist:
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
class FacultyList(APIView):
  def list(self,request):
    params = request.query_params
    try:
      if params.get('department') != '':
        faculty = models.Faculty.objects.filter(department=params.get('department'))
        serializer = serializers.FacultySerializer(faculty)
        return Response(serializer.data)
    except Faculty.DoesNotExist:
      raise Http404
class HoldList(generics.ListCreateAPIView):
  queryset = models.Hold.objects.all()
  serializer_class = serializers.HoldSerializer
class RoomList(APIView):
  queryset = models.Room.objects.all()
  serializer_class = serializers.RoomSerializer
  def get(self,request):
    params = request.query_params
    if params.get('building') != '':
      room = models.Room.objects.filter(department_id=params.get('building'))
      serializer = serializers.RoomSerializer(room)
      return Response(serializer.data)
    else:
      room = models.Room.objects.all()
      serializer = serializers.RoomSerializer(room)
      return Response(serializer.data)
# Will probably not be used RoomDetails
@method_decorator(csrf_exempt, name='dispatch')
class StudentDetail(APIView):
  def get_object(self, email):
    try:
      user = models.User.objects.get(email=email)
      student = models.Student.objects.get(id=user.id)
      return student
    except Student.DoesNotExist:
      raise Http404
  def get(self, request, email):
    student = self.get_object(email)
    serializer = serializers.StudentSerializer(student)
    return Response(serializer.data)
  def put(self, request, email):
    params = request.data
    student = self.get_object(email)
    if params.get('hold') != '':
      hold = models.Holds.objects.get(params.get('hold'))
      if student.hold.filter(name=hold.name):
        student.remove(hold)
      else:
        student.add(hold)
    if params.get('isUndergrad') != '':
      if student.isUndergrad:
        student.isUndergrad = False
      else:
        student.isUndergrad = True
    serializer = serializers.StudentSerializer(student)
    if serializer.is_valid:
      return Response(serializer.data)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
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
class SlotList(APIView):
  def list(self,request):
    try: 
      params = request.query_params
      filters=[]
      days = []
      if params.get('building') != '':
        filters.append(Q(room__building__id=int(params.get('building'))))
      if params.get('term') != '':
        filters.append(Q(term_id=params.get('term')))
      if params.get('time') != '':
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
        queryset = models.Slot.objects.all()
        serializer = serializers.CourseSectionSerializer(queryset, many=True)
        return Response(serializer.data)
      elif len(days) == 4:
        raise Http404
      else:
        queryset = None
        if len(days) == 0:
          queryset = models.CourseSection.objects.filter(reduce(Q.__and__,filters))
        elif len(days) != 0:
          raise Http404
        else: 
          queryset = models.CourseSection.objects.filter(reduce(Q.__and__,filters)).exclude(slot__day__id__in=days)
        serializer = serializers.CourseSectionSerializer(queryset, many=True)
        return Response(serializer.data)
    except:
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
  #           if serializer.is_valid():
  #             serializer.save()
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
    if params.get('firstName') != '':
      user.firstName = params.get('firstName')
    if params.get('lastName') != '':
      user.lastName = params.get('lastName')
    if params.get('address') != '':
      user.address = params.get('address')
    if params.get('city') != '':
      user.city = params.get('city')
    if params.get('state') != '':
      user.state = params.get('state')
    if params.get('country') != '':
      user.country = params.get('country')
    if params.get('phoneNumber') != '':
      user.phoneNumber = params.get('phoneNumber')
    if params.get('isLockout') != '':
      if user.isLockout:
        user.isLockout = False
      else:
        user.isLockout = True
    serializer = serializers.UserSerializer(user)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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