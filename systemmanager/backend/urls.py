from django.urls import path
from django.conf.urls import url

from django.contrib.auth.views import LoginView
from rest_framework_jwt.views import obtain_jwt_token
from django.contrib import admin


from backend import api


urlpatterns = [
    path('login.json', LoginView.as_view()),
    path('token-auth', api.auth_jwt.as_view()),
    path('current-user', api.current_user),
    path('token-user', api.TokenUser.as_view()),
    path('user-password-change', api.UserPasswordChange.as_view()),

    path('user-list.json', api.UserList.as_view()),

    path('advisor-details.json/<str:student>', api.AdvisorDetails.as_view()),
    path('advisor-list.json', api.AdvisorList.as_view()),
    path('building-details.json-<int:code>', api.BuildingDetails.as_view()),
    path('building-list.json', api.BuildingList.as_view()),
    path('course-details.json/<str:id>', api.CourseDetails.as_view()),
    path('course-list.json', api.CourseList.as_view()),
    path('course-section-details.json/<int:id>', api.CourseSectionDetails.as_view()),
    path('course-section-list.json', api.CourseSectionList.as_view()),
    path('day-list.json', api.DayList.as_view()),
    path('department-details.json/<int:code>', api.DepartmentDetails.as_view()),
    path('department-list.json', api.DepartmentList.as_view()),
    path('enrollment-details.json/<int:section_id>/<int:student_id>',api.EnrollmentDetails.as_view()),
    path('enrollment-list.json', api.EnrollmentList.as_view()),
    path('faculty-details.json/<str:email>', api.FacultyDetails.as_view()),
    path('faculty-list.json', api.FacultyList.as_view()),
    path('transcript-list.json/<str:email>', api.TranscriptList.as_view()),
    path('attendance-list.json/<int:course_section_id>', api.AttendanceList.as_view()),
    path('grade-details.json/<str:email>/<str:course_section_id>', api.GradeDetails.as_view()),
    path('grade-list.json', api.GradeList.as_view()),
    path('hold-list.json', api.HoldList.as_view()),
    path('room-list.json', api.RoomList.as_view()),
    path('prerequisite-details.json/<str:id>', api.PrerequisiteDetails.as_view()),
    path('prerequisite-list.json', api.PrerequisiteList.as_view()),
    path('major-details.json/<int:id>', api.MajorDetails.as_view()),
    path('major-list.json', api.MajorList.as_view()),
    path('minor-list.json', api.MinorList.as_view()),
    path('student-details.json/<str:email>', api.StudentDetails.as_view()),
    path('student-list.json', api.StudentList.as_view()),
    path('student-major-details.json/<str:student>/<int:major>', api.StudentMajorDetails.as_view()),
    path('student-minor-details.json/<str:student>/<int:minor>', api.StudentMinorDetails.as_view()),
    path('student-major-list.json', api.StudentMajorList.as_view()),
    path('student-minor-list.json', api.StudentMinorList.as_view()),
    path('slot-details.json/<int:id>', api.SlotDetails.as_view()),
    path('slot-list.json', api.SlotList.as_view()),
    path('time-list.json', api.TimeList.as_view()),
    path('term-details.json/<str:season>/<int:year>', api.TermDetails.as_view()),
    path('term-list.json', api.TermList.as_view()),
    path('user-details.json/<str:email>', api.UserDetails.as_view()),

]
