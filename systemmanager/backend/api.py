from backend import models

import re 
from datetime import datetime
import io
import jwt
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated

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
from systemmanager import settings
from django.contrib import auth
from django.core import mail

from rest_framework_jwt.views import ObtainJSONWebToken

from rest_framework import generics

from rest_framework import viewsets, permissions
from rest_framework.authtoken.models import Token

from django.views import View;
from backend import serializers

# Authentication
@method_decorator(csrf_exempt, name='dispatch')
@api_view(['GET'])
def current_user(request):
  serializer = UserSerializer(request.user)
  return Response({'data':serializer.data})

@method_decorator(csrf_exempt, name='dispatch')
class auth_jwt(ObtainJSONWebToken):
    def post(self, request, *args, **kwargs):
      try:
        isLockout = models.User.objects.get(email=request.data.get('email')).isLockout
        if isLockout == True:
          return Response({'message':"The account is locked. Please contact an admin to unlock"},status=status.HTTP_400_BAD_REQUEST)
        response = super().post(request, *args, **kwargs)
        # foo bar
        return response
      except:
        return Response({'message':"The password is incorrect"},status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name='dispatch')
def auth_view(request):
  username = request.POST.get('username', '')
  password = request.POST.get('password', '')

  try:
    user = auth.authenticate(username=username, password=password)
    if user is not None:
      user_model = models.User.objects.get(id=user.id)
      if user_model.isLockout == True:
        return Response({'message':"The account is locked.  Please contact an admin to unlock it"},status=status.HTTP_400_BAD_REQUEST)
      if user.is_active:
        auth.login(request, user)
        ...
        return Response({})
      else:
        return Response({'message':"Critical Error! This is not suppose to happen"},status=status.HTTP_400_BAD_REQUEST) 
    else:
      return Response({'message':"The password is incorrect"},status=status.HTTP_400_BAD_REQUEST)
  except:
    return Response({'message':"The password is incorrect"},status=status.HTTP_400_BAD_REQUEST)

class AdvisorDetails(APIView):
  serializer_class = serializers.AdvisorSerializer
  def get_object(self,student):
    # try:
      user = models.User.objects.get(email=student)
      print(user.id)
      advisor = models.Advisor.objects.get(student__user__id=user.id)
      return advisor
    # except models.Advisor.DoesNotExist:
    #   raise Http404
  def get(self, request, student):
    # try:
      advisor = self.get_object(student)
      serializer = serializers.AdvisorSerializer(advisor)
      return Response({'data':serializer.data,'message':"Successful! Obtained the advisor"},status=status.HTTP_200_OK)
    # except:
    #   return Response({'message':'The Student does not have an advisor.  This is a mistake.  Please contact an admininistrator'},status=status.HTTP_400_BAD_REQUEST)
  def delete(self, request, student):
    advisor = self.get_object(student)
    advisor.delete()
    return Reponse({'message':'Advisor was deleted'}, status=status.HTTP_200_OK)
# class AdvisorList(APIView):
#   def get_object(self,faculty):
#     try:
#       advisor = models.Advisor.objects.filter(faculty_id=faculty)
#       return advisor
#     except models.Advisor.DoesNotExist:
#       raise Http404
#   def get(self, request, faculty):
#     try:
#       advisor = self.get_object(faculty)
#       serializer = serializers.AdvisorSerializer(advisor)
#       return Response({'data':serializer.data})
#     except:
#       return Response({'message':"Could not find faculty's advisee list"})
#   def post(self, request):
#     serializer = serializer.AdvisorSerializer(data=request.data)
#     if serializer.is_valid:
#       return Response({'data':serializer.data,'message':"Successfully assigned advisor"},status=HTTP_201_CREATED)
#     return Response({'message':"Could not assign advisor"},status=HTTP_400_BAD_REQUEST)

class TokenUser(generics.RetrieveUpdateDestroyAPIView):
  def get(self, request):
    params = request.query_params
    if params.get('token') is not None:
      try:
        token = jwt.decode(str(params.get('token')),None,None)
        user = models.User.objects.get(id=token['user_id'])
        serializer = serializers.UserSerializer(user)
        return Response({'data':serializer.data},status=status.HTTP_200_OK)
      except:
        return Response({'message':"The token is invalid"},status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class UserPasswordChange(generics.RetrieveUpdateDestroyAPIView):
  def put(self,request):
    try:
      user = models.User.objects.get(email=request.data.get('email'))
      password = user.password
      if 8 > len(request.data.get('password')) or len(request.data.get('password')) > 15:
        return Response({'message': "Failed! The password's length needs to be inclusively between 8 and 15"},status=status.HTTP_400_BAD_REQUEST) 
      if -1 != request.data.get('password').find('@') or \
        -1 != request.data.get('password').find('!') or \
        -1 != request.data.get('password').find('#') or \
        -1 != request.data.get('password').find('%') or \
        -1 != request.data.get('password').find('&') or \
        -1 != request.data.get('password').find('*'):     
        user.set_password(request.data.get('password'))
        new_password = user.password
        if password == new_password:
          return Response({'message': "Failed! The passwords are the same"},status=status.HTTP_400_BAD_REQUEST)
        user.save()
        return Response({'message':"Successful!! Please login again"},status=status.HTTP_200_OK)
      else:
        return Response({'message':"The password needs to include one of the following: @,!,#,%,&,*"},status=status.HTTP_400_BAD_REQUEST)
    except:
      return Response({'message':"Could not change user's password"},status=status.HTTP_400_BAD_REQUEST)

class BuildingDetails(APIView):
  serializer_class = serializers.BuildingSerializer
  def get(self, request, code):
    try:
      building = models.Building.objects.get(code=code)
      serializer = serializers.BuildingSerializer(building)
      return Response({'data':serializer.data})
    except Building.DoesNotExist:
      raise Http404
@method_decorator(csrf_exempt, name='dispatch')
class BuildingList(generics.ListCreateAPIView):
  serializer_class = serializers.BuildingSerializer
  queryset = models.Building.objects.all()
  def list(self, request):
    queryset = self.get_queryset()
    serializer = serializers.BuildingSerializer(queryset, many=True)
    return Response({'data':serializer.data,'message':"Successfully retrieved a list of buildings"})

@method_decorator(csrf_exempt, name='dispatch')
class CourseDetails(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = serializers.CourseSectionSerializer
  def get_object(self,id):
    try:
      course = models.Course.objects.get(id=id)
      return course
    except Course.DoesNotExist:
      raise Http404
  def get(self,request,id):
    try:
      course = self.get_object(id)
      serializer = serializers.CourseSerializer(course)
      return Response({'data':serializer.data})
    except:
      return Response({'message':'Could not find course'})
  def put(self,request,id):
    params = request.data
    course = self.get_object(id)
    name = params.get('name')
    description = params.get('description')
    isInCatalog = params.get('isInCatalog')
    if isInCatalog is not None:
      course.isInCatalog = isInCatalog
    if description is not None:
      course.description = description
    if params.get('numberOfCredits') is not None:
      try:
        numberOfCredits = int(params.get('numberOfCredits'))
        if(1>numberOfCredits or numberOfCredits>4):
          return Response({'message':"Please input a number inclusively between 1 and 4 for number of credits"},status=status.HTTP_400_BAD_REQUEST)
        else:
          course.numberOfCredits = numberOfCredits
      except:
        return Response({'message': "Please input a number for the credits"}, status=status.HTTP_400_BAD_REQUEST)
    course.save()
    serializer = serializers.CourseSerializer(course)
    return Response({'data':serializer.data,'message':"Successful! Course has been updated"})
  def delete(self,request,id):
    course = self.get_object(id)
    enrollment_list = models.Enrollment.objects.filter(course_section__course__id=course.id)
    connection = mail.get_connection()
    for enrollment in enrollment_list:
      try:
        confirmation_email = mail.EmailMessage(
          'Course: ' + str(course.id),
          'The course was removed and all enrollments were dropped',
          'auto@garageuniversity.me',
          [enrollment.student.user.second_email],
          connection=connection,
        )
        confirmation_email.send()
      except:
        print('student needs second email')
    connection.close()
    course.delete()
    return Response({'message':"Successful! Removed the course. Please return to the course list"},status=status.HTTP_200_OK)
class CourseList(generics.ListCreateAPIView):
  serializer_class =serializers.CourseSerializer
  queryset = models.Course.objects.all().order_by('department')
  def list(self,request):
    params = request.query_params
    if params.get('department') is not None:
      queryset = models.Course.objects.filter(department=params.get('department'))
      serializer = serializers.CourseSerializer(queryset,many=True)
      return Response({'data':serializer.data, 'message':"Successfully retrieved a list of courses"})
    else:
      queryset = models.Course.objects.all().order_by('department')
      serializer = serializers.CourseSerializer(queryset,many=True)
      return Response({'data':serializer.data, 'message':"Successfully retrieved a list of courses"})
  def post(self,request):
    params = request.data
    if params.get('department') is not None or \
      params.get('number') is not None or \
      params.get('name') is not None or \
      params.get('description') is not None or \
      params.get('numberOfCredits') is not None or \
      params.get('isInCatalog') is not None:
      department = models.Department.objects.get(code=params.get('department'))
      if isinstance(params.get('number'),int):
        return Response({'message': 'Failed! The id inputted is not a number'},status=status.HTTP_400_BAD_REQUEST)
      if isinstance(params.get('numberOfCredits'),int):
        return Response({'message': 'Failed! The number of credits inputted is not a number'},status=status.HTTP_400_BAD_REQUEST)
      if len(params.get('number')) != 3:
        return Response({'message': 'Failed! The id inputted needs to be a three digit number'},status=status.HTTP_400_BAD_REQUEST)
      id = str(params.get('department')) + str(params.get('number'))
      if 4 < int(params.get('numberOfCredits')) or int(params.get('numberOfCredits')) < 1:
        return Response({'message':"The number of credits needs to be inclusively between 1 and 4"}, status=status.HTTP_400_BAD_REQUEST)
      if len(params.get('number')) > 3:
        return Response({'message':"The course ID cannot be longer than 3"},status=status.HTTP_400_BAD_REQUEST)
      course = models.Course.objects.filter(name=params.get('name'))
      if course.count() != 0:
        return Response({'message':"The course name exist already"}, status=status.HTTP_400_BAD_REQUEST)

      course = models.Course.objects.filter(id=params.get('department') + params.get('number'))
      if course.count() != 0:
        return Response({'message':"The course ID exist already"}, status=status.HTTP_400_BAD_REQUEST)
      course = models.Course.objects.create(
        id = id,
        department=department,
        number=params.get('number'),
        name=params.get('name'),
        description=params.get('description'),
        numberOfCredits=params.get('numberOfCredits'),
        isGraduateCourse=False,
        isActive=True,
        isInCatalog = params.get('isInCatalog')
      )
      course.save()
      course = models.Course.objects.get(id=course.id)
      serializer = serializers.CourseSerializer(course)
      return Response({'data':serializer.data, 'message':"Successful!! The course was successfully created"},status=status.HTTP_201_CREATED)
@method_decorator(csrf_exempt, name='dispatch')
class CourseSectionDetails(generics.RetrieveUpdateDestroyAPIView):
  def get_object(self,id):
    try:
      section = models.CourseSection.objects.get(id=id)
      return section
    except models.CourseSection.DoesNotExist:
      raise Http404
  def get(self, request,id):
    try:
      section = self.get_object(id)
      serializer = serializers.CourseSectionSerializer(section)
      return Response({'data':serializer.data,'message':"Successful!"},status=status.HTTP_200_OK)
    except:
      return Response({'message':'Could not find course'})
  def put(self, request,id):
    params = request.data

    queryset = models.CourseSection.objects.get(id = id)
    if params.get('slot') is not None:
      queryset = models.CourseSection.objects.get(id = id)
      slot = models.Slot.objects.get(id = params.get('slot'))
      if not slot in queryset.slot.all():
        section = models.CourseSection.objects.filter(term_id=queryset.term.id,slot__id=slot.id,faculty_id=queryset.faculty.user_id)
        if len(section) != 0:
          return Response({'message':"Faculty has another class at this time"},status=status.HTTP_400_BAD_REQUEST)
        if queryset.slot.count() > 3:
          return Response({'message':"A course can only have 4 slots assigned"}, status=status.HTTP_400_BAD_REQUEST)
        section = models.CourseSection.objects.filter(term_id=queryset.term.id,slot__id=slot.id,room_id=queryset.room.id)
        if len(section) != 0:
          return Response({'message':"Room is not available at this time and day"},status=status.HTTP_400_BAD_REQUEST)
        slot.save()
        queryset.slot.add(slot)
      else:
        slot.save()
        queryset.slot.remove(slot)
      queryset.save()
      serializer = serializers.CourseSectionSerializer(queryset)
      return Response({'data':serializer.data,'message':"Successful!"})
    # if params.get('numOfSeats') is not None:
    #   data.append(Q(numOfSeats=params.get('numOfSeats')))
    if params.get('faculty') is not None:
      faculty = models.Faculty.objects.get(user_id=params.get('faculty'))
      if queryset.slot.count() != 0:
        for slot in queryset.slot:
          try:
            section = models.CourseSection.objects.get(faculty=faculty, slot__day__id=slot.day.id, slot__time__id=slot.time.id, term_id=section.term.id)
          except:
            return Response({'message':"Faculty already has a class"})
        queryset.faculty=faculty
        queryset.save()
    if params.get('numOfSeats') is not None:
      try:
        if queryset.numOfTaken >= int(params.get('numOfSeats')):
          return Response({'message':'The inputted number of seats is smaller than the number of seats taken'},status=status.HTTP_400_BAD_REQUEST)
      except:
        return Response({'message':"Please input an integer for number of seats total"},status=status.HTTP_400_BAD_REQUEST)
      queryset.numOfSeats = params.get('numOfSeats')
      queryset.save()
    serializer = serializers.CourseSectionSerializer(queryset)
    return Response({'data':serializer.data,'message':"Successful!"})
  def delete(self, request,id):
    queryset = self.get_object(id)
    enrollment_list = models.Enrollment.objects.filter(course_section__id=queryset.id)
    connection = mail.get_connection()
    for enrollment in enrollment_list:
      try:
        transcript = models.Transcript.objects.get(year=enrollment.course_section.term.year,season=enrollment.course_section.term.season,course_id=enrollment.course_section.course.id,student_id=enrollment.student.user.id)
        transcript.delete()
      except:
        print('Could not find transcript')
      try:
        confirmation_email = mail.EmailMessage(
          'Course Section: ' + str(enrollment.course_section.id),
          'The course section was removed and all enrollments were dropped',
          'auto@garageuniversity.me',
          [enrollment.student.user.second_email],
          connection=connection,
        )
        confirmation_email.send()
      except:
        print('student needs second email')
    connection.close()
    queryset.delete()
    return Response({'message': 'Successfully deleted section'}, status=status.HTTP_200_OK)
@method_decorator(csrf_exempt, name='dispatch')
class CourseSectionList(generics.ListCreateAPIView):
  serializer_class = serializers.CourseSectionSerializer
  def list(self, request):
    params = request.query_params
    if params.get('faculty_username') is not None and params.get('term_id') is not None:
      course_section_list = models.CourseSection.objects.filter(faculty__user__email=params.get('faculty_username'),term_id=params.get('term_id'))
      serializer = serializers.CourseSectionSerializer(course_section_list,many=True)
      return Response({'data':serializer.data,'message':"Successfully returned the faculty's courses"},status=status.HTTP_200_OK)
    try:
      filters=[]
      days = []
      if params.get('courseID') is not None:
        filters.append(Q(course_id=params.get('courseID')))
      if params.get('creditMin') is not None:
        try:
          filters.append(Q(course__numberOfCredits__gte=int(params.get('creditMin'))))
        except:
          return Response({'message':"Not a valid credit minimum"},status=status.HTTP_400_BAD_REQUEST)
      if params.get('creditMax') is not None:
        try:
          filters.append(Q(course__numberOfCredits__lte=int(params.get('creditMax'))))
        except:
          return Response({'message':"Not a valid credit maximum"},status=status.HTTP_400_BAD_REQUEST)
      if params.get('facultyLastName') is not None:
        filters.append(Q(faculty__user__lastName__icontains=params.get('facultyLastName')))
      if params.get('courseName') is not None:
        filters.append(Q(course__name__icontains=params.get('courseName')))
      if params.get('department') is not None:
        filters.append(Q(faculty__department=params.get('department')))
      if params.get('term') is not None:
        term_list = models.Term.objects.all()
        if params.get('term')==term_list.reverse()[1].id:
          return Response({'message':"This could be an error. Please insert a recent term"},status=status.HTTP_400_BAD_REQUEST)
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
      if params.get('friday') == 'false':
        days.append('5')
      if len(days) != 0:
        filters.append(Q(slot__isnull=False))
      if not filters and len(days) == 0:
        queryset = models.CourseSection.objects.all()
        serializer = serializers.CourseSectionSerializer(queryset, many=True)
        return Response({'data':serializer.data,'message':"Successful!"})
      elif len(days) == 5:
        return Response({'message':"Please select one of the days"}, status=status.HTTP_400_BAD_REQUEST)
      else:
        queryset = None
        if len(days) == 0:
          queryset = models.CourseSection.objects.filter(reduce(Q.__and__,filters)).distinct()
        else:
          queryset = models.CourseSection.objects.filter(reduce(Q.__and__,filters)).exclude(slot__day__id__in=days).distinct()
        serializer = serializers.CourseSectionSerializer(queryset, many=True)
        return Response({'data':serializer.data,"message":"Successfully retrieved a list of courses"})
    except models.CourseSection.DoesNotExist:
      raise Response({'message':"Could not find sections with inputted fields"})
  def post(self,request):
    params = request.data
    term = params.get('term')
    course = params.get('course')
    room = params.get('room')
    number = models.CourseSection.objects.filter(course_id=course).count()
    section = models.CourseSection.objects.create(course_id=course,number=number+1,term_id=term,room_id=room)
    numOfSeats = params.get('numOfSeats')
    if numOfSeats is not None:
      try:
        section.numOfSeats = int(numOfSeats)
      except:
        return Response({'message':"The number of seats is invalid"},status=status.HTTP_400_BAD_REQUEST)
    faculty = params.get('faculty')
    if faculty is not None:
      faculty = models.Faculty.objects.get(user_id=faculty)
      try:
        section = models.CourseSection.objects.get(faculty=faculty, slot__day__id__in=section.slot.day.id, slot__time__id__in=section.slot.time.id, term_id=section.term.id)
        if section is not None:
          return Response({'message':"Faculty is already teaching a class at this time"},status=status.HTTP_400_BAD_REQUEST)
      except:
        section.faculty = faculty_id=faculty
    section.save()
    serializer = serializers.CourseSectionSerializer(section)
    return Response({'data':serializer.data,'message':"Successful!!  Course section was added"})
class DayList(generics.ListCreateAPIView):
  serializer_class = serializers.DaySerializer()
  queryset = models.Day.objects.all()
  def list(self,request):
    queryset =  models.Day.objects.all()
    serializer = serializers.DaySerializer(queryset, many=True)
    return ({'data':serializer.data, "message":"Successfully retrieved a list of data"})
@method_decorator(csrf_exempt, name='dispatch')
class DepartmentDetails(generics.RetrieveUpdateDestroyAPIView):
  def get(self, request, code):
    try:
      department = models.Department.get(code=code)
      serializer = serializers.DepartmentSerializer(department)
      return Response({'data':serializer.data,'message':"Successful!"})
    except Department.DoesNotExist:
      raise Http404
@method_decorator(csrf_exempt, name='dispatch')
class DepartmentList(generics.ListCreateAPIView):
  queryset = models.Department.objects.all()
  serializer_class = serializers.DepartmentSerializer
  def list(self,request):
    queryset = models.Department.objects.all()
    serializer = serializers.DepartmentSerializer(queryset,many=True)
    return Response({'data':serializer.data,'message':"Successful!"})

@method_decorator(csrf_exempt, name='dispatch')
class EnrollmentDetails(generics.RetrieveUpdateDestroyAPIView):
  def get(self,request,course_section_id,student_email):
    enrollment = models.Enrollment.objects.get(student__user__email=student_email,course_section_id=course_section_id)
    serializer = serializers.EnrollmentSerializer(enrollment)
    return Response({'data':serializer.data,'message':"Successful! Retrieved the enrollment"},status=status.HTTP_200_OK)
  def delete(self,request,course_section_id,student_email):
    enrollment = models.Enrollment.objects.get(student__user__email=student_email,course_section_id=course_section_id)
    term = enrollment.course_section.term
    date = datetime.now().date()
    start_date = None
    end_date = None
    if term.season == 'F':
      start_date=datetime(int(term.year),4,15).date()
      end_date=datetime(int(term.year),10,1).date()
    else:
      start_date=datetime(int(term.year),11,15).date()
      end_date=datetime(int(term.year)+1,2,15).date()
    if start_date > date > end_date:
      return Response({'message':"Failed! The student cannot drop at this time"},status=status.HTTP_400_BAD_REQUEST)
    if term.season =='F':
      start_date=datetime(int(term.year),11,1).date()
      end_date=datetime(int(term.year),12,31).date()
    else:
      start_date=datetime(int(term.year),3,1).date()
      end_date=datetime(int(term.year),5,31).date()
    try:
      transcript = models.Transcript.objects.get(student__user__email=student_email,course_id=enrollment.course_section.course.id,year=term.year,season=term.season)
      if start_date < date < end_date:
        transcript.gradeReceived = 'F'
      else:
        transcript.delete()
    except:
      print('student is missing transcript')
    enrollment.delete()
    course_section = enrollment.course_section
    course_section.numOfTaken = course_section.numOfTaken - 1
    course_section.save()
    connection = mail.get_connection()
    try:
      transcript = models.Transcript.objects.get(year=enrollment.course_section.term.year,season=enrollment.course_section.term.season,course_id=enrollment.course_section.course.id,student_id=enrollment.student.user.id)
      transcript.delete()
    except:
      print('Could not find transcript')
    try:
      confirmation_email = mail.EmailMessage(
        'Enrollment: ' + str(course_section.id),
        'The student was dropped from a course',
        'auto@garageuniversity.me',
        [enrollment.student.user.second_email],
        connection=connection,
      )
      confirmation_email.send()
    except:
      print('student needs second email')
    connection.close()
    return Response({'message':'Successfully dropped class'},status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class EnrollmentList(generics.ListCreateAPIView):
  queryset = models.Enrollment.objects.all()
  serializer_class = serializers.EnrollmentSerializer
  def list(self,request):
    params = request.query_params
    if params.get('student') is not None:
      if params.get('term') is not None:
        user = None
        student = None
        try:
          user=models.User.objects.get(email=params.get('student'))
          student=models.Student.objects.get(user_id=user.id)
        except:
          return Response({'message':"Cannot find student"},status=status.HTTP_400_BAD_REQUEST)
        enrollment = models.Enrollment.objects.filter(student_id=student.user_id,course_section__term_id=params.get('term')).distinct()
        serializer = serializers.EnrollmentSerializer(enrollment, many=True)
        term = models.Term.objects.get(id=params.get('term'))
        return Response({'data':serializer.data,'message':"Successful! Recieved Term " + term.season + " " + term.year})
    if params.get('section') is not None:
      enrollment = models.Enrollment.objects.filter(course_section=params.get('section'))
      serializer = serializers.EnrollmentSerializer(enrollment,many=True)
      return Response({'data':serializer.data,'message':"Successful!"})
    if params.get('student') is not None:
      student = models.Student.objects.get(user_id=models.User.objects.get(email=params.get('student')))
      enrollment = models.Enrollment.objects.filter(student_id=student.user.id)
      serializer = serializers.EnrollmentSerializer(enrollment, many=True)
      return Response({'data':serializer.data,'message':"Successful!"})
  def post(self,request):
    params = request.data
    if params.get('section') is not None:
      if params.get('student') is not None:
        user = models.User.objects.get(email=params.get('student'))
        student = models.Student.objects.get(user_id=user.id)
        section = models.CourseSection.objects.get(id = params.get('section'))
        section_serializer = serializers.CourseSectionSerializer(section)
        if params.get('admin') is None:
          enrollmentList = models.Enrollment.objects.filter(student_id=student.user_id,course_section__term__id=section.term.id)
          credit = 0
          for enroll in enrollmentList:
            credit += int(enroll.course_section.course.numberOfCredits)
          if credit+section.course.numberOfCredits>18:
            return Response({'message':"The student cannot take more than 18 credits.  If you want to take more please contact an admin"},status=status.HTTP_400_BAD_REQUEST)
          if student.hold.count() > 0:
            return Response({"message":"Student has a hold"},status=status.HTTP_400_BAD_REQUEST)
          if int(section.numOfSeats)-int(section.numOfTaken)<=0:
            return Response({'message':"The section has no available seats"},status=status.HTTP_400_BAD_REQUEST)
          prereq_list = models.Prerequisite.objects.filter(course_id=section.course.id)
          if prereq_list.count()!=0:
            enrollment_list = models.Enrollment.objects.exclude(course_section__term__id=section.term.id)
            for prereq in prereq_list:
              isTaken = False
              for enrollment in enrollment_list:
                if prereq.course.id==enrollment.course_section.course.id:
                  transcript_list = models.Transcript.objects.filter(course_id=enrollment.course_section.course.id,student__user__id=student.user.id)
                  for transcript in transcript_list:
                    if transcript.gradeRecieved is None or transcript.gradeReceived <= prereq.requiredGrade:
                      isTaken = True
              if isTaken == False:
                return Response({'message':"The student does not meet the prerequisites"},status=status.HTTP_400_BAD_REQUEST) 
        enrollmentList = models.Enrollment.objects.filter(student_id=student.user_id,course_section__term__id=section.term.id)
        credit = 0
        for enroll in enrollmentList:
          credit += int(enroll.course_section.course.numberOfCredits)
        if credit+section.course.numberOfCredits>22:
          return Response({'message':"A student cannot take more than 22 credits"},status=status.HTTP_400_BAD_REQUEST) 
        term = section.term
        date = datetime.now().date()
        start_date = None
        end_date = None
        if term.season == 'F':
          start_date=datetime(int(term.year),4,15).date()
          end_date=datetime(int(term.year),9,1).date()
        else:
          start_date=datetime(int(term.year),11,15).date()
          end_date=datetime(int(term.year)+1,1,15).date()
        if start_date > date > end_date:
          return Response({'message':"Failed! The student do not meet the time requirements"},status=status.HTTP_400_BAD_REQUEST)
        enrollmentList = models.Enrollment.objects.filter(student_id=student.user_id,course_section__term__id=section.term.id)
        if section.slot is None or section.slot.count()==0:
          return Response({'message':"Failed! The student cannot register for a class that has no been assigned a time slot"}, status=status.HTTP_400_BAD_REQUEST)
        for enroll in enrollmentList:
          if enroll.course_section.id == params.get('section'):
            return Response({'message':"Student is already enrolled in this class"},status=status.HTTP_400_BAD_REQUEST)
          for slot in section.slot.all():
            enrollment = models.Enrollment.objects.filter(course_section__term__id=enroll.course_section.term.id,course_section__slot__time__id=slot.time.id,course_section__slot__day__id=slot.day.id)
            if enrollment.count() != 0:
              return Response({'message': "The student is enrolled in a class with the same time slot"},status=status.HTTP_400_BAD_REQUEST)
 
        try:
          transcript = models.Transcript.objects.create(course_id=section.course.id,student_id=student.user_id,year=section.term.year,season=section.term.season)
        except:
          return Response({'message':"Student has a course section of the same term similar to this one."},status=status.HTTP_400_BAD_REQUEST)
        enrollment = models.Enrollment.objects.create(student=student,course_section=section,dateEnrolled=datetime.now().date())
        enrollment = models.Enrollment.objects.get(id=enrollment.id)
        serializer = serializers.EnrollmentSerializer(enrollment)
        section.numOfTaken = section.numOfTaken+1
        section.save()
        connection = mail.get_connection()
        confirmation_email = mail.EmailMessage(
          'Course Section: ' + str(enrollment.course_section.id),
          'The student is enrolled in the class',
          'auto@garageuniversity.me',
          [enrollment.student.user.second_email],
          connection=connection,
        )
        confirmation_email.send()
        connection.close()

        return Response({'data':serializer.data,'message':"Successful!!  The student has been enrolled to the course section"},status=status.HTTP_201_CREATED)
    return Response({'message':'Could not enroll the student'},status=status.HTTP_400_BAD_REQUEST)


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
    return Response({'data':serializer.data,'message':"Successful!"})

@method_decorator(csrf_exempt, name='dispatch')
class FacultyList(generics.ListCreateAPIView):
  def list(self,request):
    params = request.query_params
    if params.get('department') is not None:
      faculty = models.Faculty.objects.filter(department_id=params.get('department'))
      serializer = serializers.FacultySerializer(faculty, many=True)
      return Response({'data':serializer.data,'message':"Successful!"})
    faculty = models.Faculty.objects.all()
    serializer = serializers.FacultySerializer(faculty,many=True)
    return Response({'data':serializer.data,'message':"Obtained all faculty"})
  def post(self,request):
    params = request.data
    if params.get('department') is not None and params.get('user_id') is not None:
      faculty = models.Faculty.objects.create(department_id=params.get('department'),user_id=params.get('user_id'))
      faculty.save()
      faculty = models.Faculty.objects.get(user_id=params.get('user_id'))
      serializer = serializers.FacultySerializer(faculty)
      return Response({'data':serializer.data,'message':"Successful!  Created a faculty"},status=status.HTTP_200_OK)

class HoldList(generics.ListCreateAPIView):
  queryset = models.Hold.objects.all()
  serializer_class = serializers.HoldSerializer
  def list(self,request):
    queryset = models.Hold.objects.all()
    serializer = serializers.HoldSerializer(queryset, many=True)
    return Response({'data':serializer.data,'message':"Successful!"})
class RoomList(generics.ListCreateAPIView):
  queryset = models.Room.objects.all()
  serializer_class = serializers.RoomSerializer
  def list(self,request):
    params = request.query_params
    if params.get('building') is not None:
      room = models.Room.objects.filter(building=params.get('building'))
      serializer = serializers.RoomSerializer(room, many=True)
      return Response({'data':serializer.data,'message':"Successful!"})
    else:
      room = models.Room.objects.all()
      serializer = serializers.RoomSerializer(room)
      return Response({'data':serializer.data,'message':"Successful!"})
class MajorDetails(generics.RetrieveUpdateDestroyAPIView):
  def get_object(self,id):
    try:
      major = models.Major.objects.get(id=id)
      return major
    except models.Major.DoesNotExist:
      raise Http404
  def get(self,request,id):
    major = self.get_object(id)
    serializer = serializers.MajorSerializer(major)
    return Response({'data':serializer.data,'message':"Successful!"})
class MajorList(generics.ListCreateAPIView):
  queryset = models.Major.objects.all()
  serializer_class = serializers.MajorSerializer
  def list(self, request):
    params = request.query_params
    if params.get("department") is not None:
      major = models.Major.objects.filter(department_id=params.get('department'))
      serializer = serializers.MajorSerializer(major,many=True)
      return Response({'data':serializer.data,"message":"Successful"})
    major = models.Major.objects.all().order_by('department')
    serializer = serializers.MajorSerializer(major,many=True)
    return Response({'data':serializer.data,'message':"Successful!"})
class MinorList(generics.ListCreateAPIView):
  queryset = models.Minor.objects.all()
  serializer_class = serializers.MinorSerializer
  def list(self, request):
    params = request.query_params
    if params.get("department") is not None:
      minor = models.Minor.objects.filter(department_id=params.get('department'))
      serializer = serializers.MinorSerializer(minor,many=True)
      return Response({'data':serializer.data,"message":"Successful"})
    minor = models.Minor.objects.all().order_by('department')
    serializer = serializers.MinorSerializer(minor,many=True)
    return Response({'data':serializer.data,'message':"Successful!"})
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
    try:
      student = self.get_object(email)
      serializer = serializers.StudentSerializer(student)
      return Response({'data':serializer.data,'message':"Successful!"})
    except:
      return Response({'message':"Failed! Could not find student"},status=status.HTTP_400_BAD_REQUEST)
  def put(self, request, email):
    params = request.data
    student = self.get_object(email)
    if params.get('holdAdd') is not None:
      hold = models.Hold.objects.get(name=params.get('holdAdd'))
      if not student.hold.filter(name=hold.name):
          hold = models.Hold.objects.get(name=params.get('holdAdd'))
          student.hold.add(hold)
          student.save()
          return Response({'message':"Successfully add the hold"},status=status.HTTP_200_OK)
      else:
        return Response({'message':"Failed! Hold is already assigned to student"},status=status.HTTP_400_BAD_REQUEST)
    if params.get('holdDelete') is not None:
      hold = models.Hold.objects.get(name=params.get('holdDelete'))
      if student.hold.filter(name=hold.name):
        student.hold.remove(hold)
        student.save()
        return Response({'message':"Successfully removed the hold"},status=status.HTTP_200_OK)
    if params.get('isUndergrad') != '' and params.get('isUndergrad') is not None:
      if student.isUndergrad:
        student.isUndergrad = False
        student.save()
      else:
        student.isUndergrad = True
        student.save()
    serializer = serializers.StudentSerializer(student)
    return Response({'data':serializer.data,'message':"Successful!"})
  def delete(self, request, email):
    student = self.get_object(email)
    student.delete()
    return Response({'message':"Successfully deleted the student"}, status=status.HTTP_200_OK)

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
    return Response({'data':serializer.data,'message':"Successful!"})
class SlotList(generics.ListCreateAPIView):
  def list(self,request):
    params = request.query_params
    filters=[]
    days = []
    if params.get('time') is not None:
      filters.append(Q(time_id=params.get('time')))
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
      serializer = serializers.SlotSerializer(queryset, many=True)
      return Response({'data':serializer.data,'message':"Successful!"})
    elif not filters:
      queryset = models.Slot.objects.exclude(day_id__in=days)
      serializer = serializers.SlotSerializer(queryset, many=True)
      return Response({'data':serializer.data,'message':"Successful!"})
    else:
      queryset = None
      if len(days) == 0:
        queryset = models.Slot.objects.filter(reduce(Q.__and__,filters))
      else:
        queryset = models.Slot.objects.filter(reduce(Q.__and__,filters)).exclude(day_id__in=days)
      serializer = serializers.SlotSerializer(queryset, many=True)
      return Response({'data':serializer.data,'message':"Successful!"})
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

class TermDetails(generics.RetrieveAPIView):
  serializer_class = serializers.TermSerializer
  def get(self,request,season,year):
    term = models.Term.objects.get(season=season,year=year)
    serializer = serializers.TermSerializer(term)
    return Response({'data':serializer.data,'message':"Successful!"})
class TermList(generics.ListCreateAPIView):
  serializer_class =serializers.TermSerializer
  queryset = models.Term.objects.all()
  def list(self,request):
    term = models.Term.objects.all()
    serializer = serializers.TermSerializer(term,many=True)
    return Response({'data':serializer.data,'message':"Successful!"})
class TimeList(generics.ListCreateAPIView):
  serializer_class = serializers.TimeSerializer
  queryset = models.Time.objects.all()
  def list(self,request):
    time = models.Time.objects.all()
    serializer = serializers.TimeSerializer(time,many=True)
    return Response({'data': serializer.data,'message':"Successful!"})
@method_decorator(csrf_exempt, name='dispatch')
class UserDetails(APIView):
  def get(self, request, email):
    try:
      user = models.User.objects.get(email=email)
      serializer = serializers.UserSerializer(user)
      return Response({'data':serializer.data,'message':"Successful!"})
    except User.DoesNotExist:
      raise Http404
  # Mimicks the attributes in models
  def put(self, request, email):
    params = request.data
    user = models.User.objects.get(email=email)
    if params.get('firstName') is not None:
      user.firstName = params.get('firstName')
    if params.get('second_email') is not None:
      user.second_email = params.get('second_email')
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
      if user.isLockout:
        user.isLockout = False
      else:
        user.isLockout = True
    user.save()
    serializer = serializers.UserSerializer(user)
    return Response({'data': serializer.data,'message':"Successful!"})
  def delete(self, request,email):
    user = models.User.objects.get(email=email)
    user.delete()
    return Response({'message':"Successfully removed the user"}, status=status.HTTP_200_OK)
@method_decorator(csrf_exempt, name='dispatch')
class UserList(APIView):
  def list(self, request):
    user = models.User.objects.all()
    serializer = serializers.UserSerializer(user)
    return Response({'data':serializer.data,'message':"Successful!"})
  def post(self, request):
    regex = re.compile('[@_!#$%^&*()<>?/\|}{~:]') 
    if not regex.search(request.data.get('password')):
      return Response({'message':"Password must contain a special character"},status=status.HTTP_400_BAD_REQUEST)
    if len(request.data.get('password')) < 9:
      return Response({'message':"Password must be at least 8 characters long"},status=status.HTTP_400_BAD_REQUEST)
    if len(request.data.get('phoneNumber')) != 10 and not isinstance(request.data.get('phoneNumber'),int):
      return Response({'message':"Phone number must be valid"},status=status.HTTP_400_BAD_REQUEST)
    serializer = serializers.UserSerializerWithToken(data=request.data)
    if serializer.is_valid():
      serializer.save()
      user = models.User.objects.get(email=request.data.get('email'))
      serializer = serializers.UserSerializer(user)
      return Response({'data':serializer.data, 'message':'Successfully created the users account'}, status=status.HTTP_201_CREATED)
    return Response({'message':"Could not create an account.  The username must be unique"},status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class AdviseeDetailsFaculty(APIView):
    serializer_class=serializers.AdvisorSerializer
    def get_object(self,faculty):
        try:
            user = models.User.objects.get(email=faculty)
            advisor = models.Advisor.objects.get(faculty_id=user.id)
            return advisor
        except models.Advisor.DoesNotExist:
            raise Http404
    def get(self, request, faculty):
        advisor = self.get_object(faculty)
        serializer = serializers.AdvisorSerializer(advisor)
        return Response({'data':serializer.data,'message':"Successful!"})

    def delete(self,request,faculty):
        advisor=self.get_object(faculty)
        advisor.delete()
        return Response({'message':"Successfully deleted advisor"}, status=status.HTTP_200_OK)



@method_decorator(csrf_exempt, name='dispatch')
class AdvisorList(generics.ListCreateAPIView):
    queryset = models.Advisor.objects.all()
    serializer_class=serializers.AdvisorSerializer
    def list(self,request):
        params = request.query_params
        if params.get('faculty_email') is not None:
            advisor = models.Advisor.objects.filter(faculty__user__email=params.get('faculty_email'))
            serializer = serializers.AdvisorSerializer(advisor, many=True)
            # print(serializer)
            ##model to json object
            return Response({'data':serializer.data,'message':"Successful!"},status=status.HTTP_200_OK)
        else:
            advisor = models.Advisor.objects.all()
            serializer = serializers.AdvisorSerializer(advisor)
            return Response({'data':serializer.data,'message':"Successful!"},status=status.HTTP_200_OK)
    def post( self, request):
        data = request.data
        today = datetime.now().date()
        student = models.Student.objects.get(user__email=data.get("email"))
        old_advisors = models.Advisor.objects.filter(student_id=student.user_id)
        if old_advisors.count() != 0:
          for advisor in old_advisors:
            advisor.delete()
        advisor = models.Advisor.objects.create(faculty_id=data.get("faculty"), student_id=student.user_id, dateAssigned=str(today))
        advisor.save()
        serializer = serializers.AdvisorSerializer(advisor)
        return Response({'data':serializer.data, 'message':"Successful!! The advisor was assigned to the student"}, status=status.HTTP_201_CREATED)

@method_decorator(csrf_exempt, name='dispatch') ##not going to work unless student id is a foreign key in attendance
class AttendanceList(generics.ListCreateAPIView):
  serializer_class = serializers.EnrollmentSerializer
  def list(self, request):
    params = request.query_params
    if params.get('course_section_id') is not None and params.get('student_email') is not None:
      attendance = models.Attendance.objects.filter(enrollment__course_section__id=params.get('course_section_id'),enrollment__student__user__email=params.get('student_email'))
      serializer = serializers.AttendanceSerializer(attendance,many=True)
      return Response({'data':serializer.data,'message':"Successful!"},status=status.HTTP_200_OK)
    if params.get('course_section_id') is not None and params.get('student_email') is None:
      attendance=models.Attendance.objects.filter(enrollment__course_section__id=params.get('course_section_id'),dayAttended=datetime.now())
      serializer = serializers.AttendanceSerializer(attendance, many=True)
      return Response({'data':serializer.data,'message':"Successful!"},status=status.HTTP_200_OK)
  # I need a course section id and a student
  def post(self, request):
    params = request.data
    if params.get('course_section_id') is not None and params.get('isPresent') is not None and params.get('student_id'):
      isTrue = None
      if params.get('isPresent') == 'false':
        isTrue = False
      else:
        isTrue = True
      enrollment = models.Enrollment.objects.get(course_section_id=params.get('course_section_id'), student__user__id=params.get('student_id'))

      attendance = models.Attendance.objects.filter(enrollment__course_section=params.get('course_section_id'),dayAttended=datetime.now())
      if len(attendance) != 0:
        return Response({'message':"Failed! Student is already assigned today"},status=status.HTTP_400_BAD_REQUEST)
      attendance = models.Attendance.objects.create(enrollment=enrollment,isPresent=isTrue,dayAttended=datetime.now())
      attendance.save()
      attendance = models.Attendance.objects.get(id=attendance.id)
      serializer = serializers.AttendanceSerializer(attendance)
      return Response({'data':serializer.data,'message':"Successful! Student has attended the class"},status=status.HTTP_200_OK)

# class TranscriptDetails(generics.RetrieveUpdateDestroyAPIView):
#    serializer_class = serializers.TranscriptSerializer
# #        try:
#            transcriptObject=models.Transcript.objects.get(student__user__email=id, course_section_id=course_section_id)
#            print(transcriptObject)
#            return transcriptObject
#        except models.Transcript.DoesNotExist:
#            raise Http404

#    def get(self, request, id, course_section_id):
#        try:
#            transcript = self.get_object(id, course_section_id)
#            serializer = serializers.TranscriptSerializer(transcript)
#            return Response(serializer.data)
#        except models.Transcript.DoesNotExist:
#            raise Http404

#    def put(self, request, id, course_section_id):
#        params = request.data
#        if params.get('transcript') is not None:
#            queryset = models.Transcript.objects.get(student__user__email=id, course_section_id=course_section_id)
#            #grade = models.Grade.objects.get(id=params.get('grade'))
#            serializer = serializers.GradeSerializer(queryset)
#            print(queryset)
#            print(serializer)
#            return Response(serializer.data)
#        queryset = self.get_object(id)

#     def delete(self, request,id, course_section_id):
#        queryset = self.get_object(id, course_section_id)
#        queryset.delete()
#        return Response({'isSuccessful': True}, status=status.HTTP_204_NO_CONTENT)

@method_decorator(csrf_exempt, name='dispatch')
class TranscriptList(generics.ListCreateAPIView):
    serializer_class = serializers.TranscriptSerializer
    def list(self,request,email):
      try:
        student = models.Student.objects.get(user__email = email)
        transcript = models.Transcript.objects.filter(student_id=student.user_id)
        serializer = serializers.TranscriptSerializer(transcript, many=True)
        return Response({'data':serializer.data,'message':"Successful!"})
      except:
        return Response({'message':"Failed! Could not find student"},status=status.HTTP_400_BAD_REQUEST)
        
        
@method_decorator(csrf_exempt, name='dispatch')
class ClassRosterDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.GradeSerializer
    def get_object(self, id, course_section_id):
        try:
            gradeObject=models.Grade.objects.get(student__user__email=id, course_section_id=course_section_id)
            return gradeObject
        except models.Grade.DoesNotExist:
            raise Http404

    def get(self, request, id, course_section_id):
        try:
            grade = self.get_object(id, course_section_id)
            serializer = serializers.GradeSerializer(grade)
            return Response({'data':serializer.data,'message':"Successful!"})
        except models.Grade.DoesNotExist:
            raise Http404

    def put(self, request, id, course_section_id):
        params = request.data
        if params.get('grade') is not None:
            queryset = models.Grade.objects.get(student__user__email=id, course_section_id=course_section_id)
            #grade = models.Grade.objects.get(id=params.get('grade'))
            serializer = serializers.GradeSerializer(queryset)
            return Response({'data':serializer.data,'message':"Successful!"})
        queryset = self.get_object(id)

@method_decorator(csrf_exempt, name='dispatch')
class GradeDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.GradeSerializer
    permission_class =[
        permissions.AllowAny
    ]
    def get_object(self, id):
        try:
            grade=models.Grade.objects.get(id=id)
            return grade
        except models.Grade.DoesNotExist:
            raise Http404
    def get(self, request, id):
      try:
        grade = self.get_object(id)
        serializer = serializers.GradeSerializer(grade)
        return Response({'data':serializer.data,'message':"Successful!"})
      except:
        return Response({'message':"Could not find a grade.  Please ask the faculty to create a grade"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        params = request.data
        if params.get('grade') is not None and params.get('type') is not None:
            queryset = models.Grade.objects.get(id=id)
            if queryset.letterGrade == params.get('grade'):
              return Response({'message':"Failed.  The submitted grade is equivalent to the grade already submitted"},status=status.HTTP_400_BAD_REQUEST)
            try:  
              if params.get('type')=='F':           
                transcript = models.Transcript.objects.filter(student__user__email=queryset.student.user.email,course_id=queryset.course_section.course.id,year=queryset.course_section.term.year,season=queryset.course_section.term.season)
                print(len(transcript))
                transcript.gradeReceived = str(params.get('grade'))
                transcript.save()
            except:
              return Response({'message':"Failed.  The system cannot find a correlating transcript"},status=status.HTTP_400_BAD_REQUEST)
            queryset.letterGrade = params.get('grade')
            queryset.save()
            connection = mail.get_connection()
            try:
              confirmation_email = mail.EmailMessage(
                'Course Section:' + str(grade.course_section.id),
                'The grade for this section has been changed',
                'auto@garageuniversity.me',
                [grade.student.user.second_email],
                connection=connection,
              )
              confirmation_email.send()
            except:
              print('student needs second email')
            connection.close()
            serializer = serializers.GradeSerializer(queryset)
            return Response({'message':"Successful!! Grade has been updated"}, status=status.HTTP_200_OK)
        return Response({'message':"Failed! Could not find grade"},status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,id, course_section_id):
        queryset = self.get_object(id, course_section_id)
        queryset.delete()
        return Response({'message':"Grade was successfully deleted"}, status=status.HTTP_200_OK)
#not completed

@method_decorator(csrf_exempt, name='dispatch')
class GradeList(generics.ListCreateAPIView):
  queryset = models.Grade.objects.all()
  serializer_class=serializers.GradeSerializer
  def list(self,request):
    params = request.query_params
    if params.get('student_email') is not None and params.get('course_section_id') is not None:
      gradeList = models.Grade.objects.filter(student__user__email=params.get('student_email'),course_section_id=params.get('course_section_id'))
      serializer = serializers.GradeSerializer(gradeList,many=True)
      return Response({'data':serializer.data,'message':"Successfully retrieved a grade list for section"},status=status.HTTP_200_OK)
    if params.get('student') is not None:
      gradeObject = models.Grade.objects.filter(student__user__email=params.get('student'))
      serializer = serializers.GradeSerializer(gradeObject, many=True)
      return Response({'data':serializer.data},status=status.HTTP_200_OK)
    elif params.get('section') is not None:
      grade_list = models.Grade.objects.filter(course_section=params.get('section'))
      serializer = serializers.GradeSerializer(grade_list,many=True)
      return Response({'data':serializer.data},status=status.HTTP_200_OK)
    return Response({'message':"Could not retrieve grade. Please check the query"},status=status.HTTP_400_BAD_REQUEST)
  def post(self,request):
    params = request.data
    if params.get('course_section_id') is not None and params.get('student_email') is not None:
      date = datetime.now().date()
      start_date = None
      end_date = None
      section = models.CourseSection.objects.get(id=params.get('course_section_id'))
      term = section.term
      try:
        if params.get('type') == 'F':
          if term.season == 'SP':
            start_date = datetime(int(term.year),5,1).date()
            end_date = datetime(int(term.year),7,1).date()
          else:
            start_date = datetime(int(term.year),12,1).date()
            end_date = datetime(int(term.year),12,31).date()
        else:
          if term.season == 'SP':
            start_date = datetime(int(term.year),2,15).date()
            end_date = datetime(int(term.year),3,15).date()
          else:
            start_date = datetime(int(term.year),10,15).date()
            end_date = datetime(int(term.year),11,15).date()
        if start_date > date or date > end_date:
          return Response({'message':"Failed! The grades are passed the final date"},status=status.HTTP_400_BAD_REQUEST)
      except:
        return Response({'message':"Failed! The course section was not found"},status=status.HTTP_400_BAD_REQUEST)
      try:
        grade = models.Grade.objects.create(
          type= params.get('type'), 
          letterGrade=params.get('letterGrade'), 
          course_section_id=params.get('course_section_id'),
          student_id=models.User.objects.get(email=params.get('student_email')).id
        )
        grade.save()
        grade = models.Grade.objects.get(id=grade.id)
        serializer = serializers.GradeSerializer(grade)
        return Response({'data':serializer.data,'message':"Successful!! Assigned a grade"},status=status.HTTP_200_OK)
      except:
        return Response({'message':"Failed! A grade exist already. Please ask the admin to update the grade"},status=status.HTTP_400_BAD_REQUEST)

# Prereq and below in models
@method_decorator(csrf_exempt, name='dispatch')
class PrerequisiteDetails(generics.RetrieveUpdateDestroyAPIView):
  def get_object(self, id):
    prerequisite = models.Prerequisite.objects.get(id=id)
    return prerequisite
  def get(self,request,id):
    prerequisite = self.get_object(id)
    serializer = serializers.PrerequisiteSerializer(prerequisite)
    return Response({'data':serializer.data})
  def delete(self,request,id):
    prerequisite = self.get_object(id).delete()
    return Response({'message':"Successfully removed a prerequisite"}, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt,name='dispatch')
class PrerequisiteList(generics.ListCreateAPIView):
  def list(self,request):
    params = request.query_params
    if params.get('course') is not None:
      prerequisite = models.Prerequisite.objects.filter(course_id=params.get('course'))
      serializer = serializers.PrerequisiteSerializer(prerequisite,many=True)
      return Response({'data':serializer.data})
  def create(self, request):
    params = request.data
    if params.get('course') is not None and params.get('prerequisite') is not None:
      if params.get('course') == params.get('prerequisite'):
        return Response({'message':"The prerequisite cannot have the same ID as the course"})
      course = models.Course.objects.get(id=params.get('course'))
      prerequisite = models.Course.objects.get(id=params.get('prerequisite'))
      prerequisite = models.Prerequisite.objects.create( \
        requiredGrade = 'C',
        course = course,
        prereq = prerequisite
      )
      prerequisite.save()
      serializer = serializers.PrerequisiteSerializer(prerequisite)
      return Response({'data':serializer.data,'message':"Successful! Added the prerequisite to " + str(course.id)})

class StudentList(generics.ListCreateAPIView):
  def post(self,request):
    params = request.data
    if params.get('user_id') is not None:
      student = models.Student.objects.create(user_id=params.get('user_id'))
      student.save()
      student = models.Student.objects.get(user_id=params.get('user_id'))
      serializer = serializers.StudentSerializer(student)
      return Response({'data':serializer.data,'message':"Successful! Created a Student"},status=status.HTTP_200_OK)

class StudentMajorDetails(generics.RetrieveUpdateDestroyAPIView):
  def delete(self,request,student,major):
    student_major = models.StudentMajor.objects.get(student__user__email=student,major_id=major)
    connection = mail.get_connection()
    try:
      confirmation_email = mail.EmailMessage(
        'Student Major' + str(student_major.major.name),
        "The student's major has been changed",
        'auto@garageuniversity.me',
        [student_major.student.user.second_email],
        connection=connection,
      )
      confirmation_email.send()
    except:
      print('student needs second email')
    connection.close()
    student_major.delete()
    #Email
    return Response({'message':"Successful! Removed the students major"},status=status.HTTP_200_OK)

class StudentMinorDetails(generics.RetrieveUpdateDestroyAPIView):
  def delete(self,request,student,minor):
    student_minor = models.StudentMinor.objects.get(student__user__email=student,minor_id=minor)
    connection = mail.get_connection()
    try:
      confirmation_email = mail.EmailMessage(
        'Student Minor' + str(student_minor.minor.name),
        "The student's minor has been changed",
        'auto@garageuniversity.me',
        [student_minor.student.user.second_email],
        connection=connection,
      )
      confirmation_email.send()
    except:
      print('student needs second email')
    connection.close()
    student_minor.delete()
    #Email
    return Response({'message':"Successful! Removed the students minor"},status=status.HTTP_200_OK)

class StudentMajorList(generics.ListCreateAPIView):
  def list(self,request):
    params = request.query_params
    if params.get('email') is not None:
      student_major = models.StudentMajor.objects.filter(student__user__email=params.get('email'))
      serializer = serializers.StudentMajorSerializer(student_major,many=True)
      return Response({'data':serializer.data,'message':"Successful!"})
    if params.get('major_id') is not None:
      student_major = models.StudentMajor.objects.filter(major_id=params.get('major_id'))
      serializer = serializers.StudentMajorSerializer(student_major, many=True)
      return Response({'data':serializer.data,'message':"Successful!"})
  def post(self,request):
    params = request.data
    if params.get('email') is not None and params.get('major') is not None:
      student = models.Student.objects.get(user_id=models.User.objects.get(email=params.get('email')).id)
      majors = models.StudentMajor.objects.filter(student=student)
      if len(majors)>3:
        return Response({'message':"The student is limited to two majors"},status=status.HTTP_400_BAD_REQUEST)
      for major in majors:
        if major.major.id==int(params.get('major')):
          return Response({'message':"The student is already assigned to this major"},status=status.HTTP_400_BAD_REQUEST)
      major = models.Major.objects.get(id=params.get('major'))
      student_major = models.StudentMajor.objects.create(student_id=student.user_id,major_id=major.id,dateDeclared=datetime.today().date())
      student_major.save()
      connection = mail.get_connection()
      try:
        confirmation_email = mail.EmailMessage(
          'Student Major' + str(student_major.major.name),
          "The student's major has been changed",
          'auto@garageuniversity.me',
          [student_major.student.user.second_email],
          connection=connection,
        )
        confirmation_email.send()
      except:
        print('student needs second email')
      connection.close()
      serializer = serializers.StudentMajorSerializer(student_major)
      return Response({'data':serializer.data, 'message':'Successful!!  The student is assigned to the major'},status=status.HTTP_201_CREATED)
    return Response({'message':"Could not find student or section"},status=status.HTTP_400_BAD_REQUEST)

class StudentMinorList(generics.ListCreateAPIView):
  def list(self,request):
    params = request.query_params
    if params.get('email') is not None:
      student_minor = models.StudentMinor.objects.filter(student__user__email=params.get('email'))
      serializer = serializers.StudentMinorSerializer(student_minor,many=True)
      return Response({'data':serializer.data,'message':"Successful!"})
  def post(self,request):
    params = request.data
    if params.get('email') is not None and params.get('minor') is not None:
      student = models.Student.objects.get(user_id=models.User.objects.get(email=params.get('email')).id)
      minors = models.StudentMinor.objects.filter(student=student)
      if len(minors)>1:
        return Response({'message':"The student is limited to one minor"}, status=status.HTTP_400_BAD_REQUEST)
      minor = models.Minor.objects.get(id=params.get('minor'))
      student_minor = models.StudentMinor.objects.create(student_id=student.user_id,minor_id=minor.id,dateDeclared=datetime.today().date())
      student_minor.save()
      connection = mail.get_connection()
      try:
        confirmation_email = mail.EmailMessage(
          'Student Minor' + str(student_minor.minor.name),
          "The student's minor has been changed",
          'auto@garageuniversity.me',
          [student_minor.student.user.second_email],
          connection=connection,
        )
        confirmation_email.send()
      except:
        print('student needs second email')
      connection.close()
      serializer = serializers.StudentMinorSerializer(student_minor)
      return Response({'data':serializer.data, 'message':"Successful!!  The student is assigned to the minor"},status=status.HTTP_201_CREATED)
    return Response({'message':"Could not find student or section"}, status=status.HTTP_400_BAD_REQUEST)

class Popular(generics.ListCreateAPIView):
  def getDate(self,term_id):
    term = models.Term.objects.get(id=term_id)
  # Season + year
  # Fall
  # 04-01-year => 10-30-year
  # Spring
  # 11-01-year => 03-28-year+1
    date_compare = {}
    if term.season == 'F':
      date_compare['start_date']=datetime(int(term.year),4,1).date()
      date_compare['end_date']=datetime(int(term.year),10,30).date()
      return date_compare
    else:
      date_compare['start_date']=datetime(int(term.year),11,1).date()
      date_compare['end_date']=datetime(int(term.year)+1,3,28).date()
      return date_compare
  def list(self,request):
    params = request.query_params
    if params.get('student_major_number') is not None and params.get('term_id') is not None:
      date_compare = self.getDate(params.get('term_id'))
      major_list = models.Major.objects.all()
      current_major = {}
      length = 0
      for major in major_list:
        serializer = serializers.MajorSerializer(major)
        student_major_length = len(models.StudentMajor.objects.filter(major_id=major.id,dateDeclared__gt=date_compare['start_date'],dateDeclared__lt=date_compare['end_date']))
        current_major[major.id] = {'major':serializer.data,'length':student_major_length}
      return Response({'data':current_major},status=status.HTTP_200_OK)
    if params.get('student_course_number') is not None and params.get('term_id') is not None and params.get('major_id'):
      course_list = models.Major.objects.get(id=params.get('major_id')).requirement
      course_amount_list = {}
      for course in course_list.all():
        serializer = serializers.CourseSerializer(course)
        amount = len(models.Enrollment.objects.filter(course_section__course__id=course.id, course_section__term__id=params.get('term_id')))
        course_amount_list[course.id] = {'course':serializer.data,'amount':amount}
      return Response({'data':course_amount_list},status=status.HTTP_200_OK)
    if params.get('student_minor_number') is not None and params.get('term_id') is not None:
      date_compare = self.getDate(params.get('term_id'))
      minor_list = models.Minor.objects.all()
      current_minor = {}
      length = 0
      for minor in minor_list:
        serializer = serializers.MinorSerializer(minor)
        student_minor_length = len(models.StudentMinor.objects.filter(minor_id=minor.id,dateDeclared__gt=date_compare['start_date'],dateDeclared__lt=date_compare['end_date']))
        current_minor[minor.id] = {'minor':serializer.data,'amount':student_minor_length}
      return Response({'data':current_minor},status=status.HTTP_200_OK)
    if params.get('student_slot_number') is not None and params.get('term_id') is not None:
      slot_list = models.Slot.objects.all()
      slot_list_amount = {}
      for slot in slot_list:
        serializer = serializers.SlotSerializer(slot)
        amount = len(models.CourseSection.objects.filter(term_id=params.get('term_id'),slot__id=slot.id))
        slot_list_amount[slot.id] = {'slot':serializer.data,'amount':amount}
      return Response({'data':slot_list_amount},status=status.HTTP_200_OK)
    return Response({'message':"Failed! Something went wrong"},status=status.HTTP_400_BAD_REQUEST)