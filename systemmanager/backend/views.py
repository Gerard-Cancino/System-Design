from backend.models import User
from backend.serializers import UserSerializer
from rest_framework import generics
from django.db.models import Q

from django.conf import settings
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from User.models import User, Student, CourseSection
from datetime import date

class SettingsBackend(UserViewSet):

    def ResetPassword(self, request, email=None, password=None):
    	User = User.objects.get(email=email)
    	if User.count() > 0:
    		login_valid = (email.lower() == User.email.lower())
        	pwd_valid = check_password(password, User.password)
        	if login_valid and pwd_valid:
                    try:
                	newPassword=input('Enter a new Password')
                	User.password = newPassword
                	User.save()
                	##User.objects.filter(email=email).update(password = newPassword)
            	    except User.DoesNotExist:
                	print('Account DNE')
            	    return None
        return None
        
    def unlockUserAccount(self, email=None, password=None):
    	User=User.objects.get(email=email)
    	if User.Exists()&&User.email.lower()==email.lower()&&User.password==password:
    		return permissions.AllowAny
    		##Not sure if this or main menu or to literally unlock acc somehow
    	else:
    		print('Invalid Credentials')
    		return None
    		
    def registerStudentToCourse(self, studentID=None, courseID=None):
    	User=User.objects.get(pk=studentID)
    	CourseSection=CourseSection.objects.get(courseId = courseID)
    	if User.count()>0&&CourseSection.courseId == courseID&&CourseSection.numOfSeats >0:
		##students dont have an id, field in CourseSection
		Enrollment=Enrollment(studentID=studentID, courseSectionID = CourseSection.id, dateEnrolled =date.today) 
    		CourseSection.numOfSeats = (int(CourseSection.numOfSeats)) - 1
    		CourseSection.save()
    		Enrollment.save(force_insert=True)	
    	else:
    		print('failed to add')
    		return None
    		
    	
    def get_user(self, id):
        try:
            return User.objects.get(pk=id)
        except User.DoesNotExist:
            return None
            
            
            
            
            
            
    def get_queryset(self):
        result = super(BlogSearchListView, self).get_queryset()

        query = self.request.GET.get('q')
        if query:
            query_list = query.split()
            result = result.filter(
                reduce(operator.and_,
                       (Q(title__icontains=q) for q in query_list)) |
                reduce(operator.and_,
                       (Q(content__icontains=q) for q in query_list))
            )

        return result