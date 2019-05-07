from django.urls import path
from django.conf.urls import url

from django.contrib.auth.views import LoginView
from rest_framework_jwt.views import obtain_jwt_token
from django.contrib import admin

from .api import TODOViewSet

from backend import api


urlpatterns = [
    path('login.json/', LoginView.as_view()),
    path('token-auth/', obtain_jwt_token),

    path('advisor-details.json/<str:student>', api.AdvisorDetails.as_view()),
    path('advisor-list.json', api.AdvisorList.as_view()),
    path('building-details.json-<int:code>', api.BuildingDetails.as_view()),
    path('building-list.json', api.BuildingList.as_view()),
    path('course-details.json/<int:id>', api.CourseDetails.as_view()),
    path('course-list.json', api.CourseList.as_view()),
    path('course-section-details.json/<int:id>', api.CourseSectionDetails.as_view()),
    path('course-section-list.json', api.CourseSectionList.as_view()),
    path('day-list.json', api.DayList.as_view()),
    path('department-details.json/<int:code>', api.DepartmentDetails.as_view()),
    path('department-list.json', api.DepartmentList.as_view()),
    path('enrollment-list.json', api.EnrollmentList.as_view()),
    path('faculty-details.json/<str:email>', api.FacultyDetails.as_view()),
    path('faculty-list.json', api.FacultyList.as_view()),
    path('grade-details.json/<int:id>', api.GradeDetails.as_view()),
    path('hold-list.json', api.HoldList.as_view()),
    path('room-list.json', api.RoomList.as_view()),
    path('student-details.json/<str:email>', api.StudentDetails.as_view()),
    path('slot-details.json/<int:id>', api.SlotDetails.as_view()),
    path('slot-list.json', api.SlotList.as_view()),
    path('time-list.json', api.TimeList.as_view()),
    path('term-list.json', api.TermList.as_view()),
    path('user-details.json/<str:email>', api.UserDetails.as_view()),
    path('user-list.json', api.UserList.as_view()),

]
