from django.conf.urls import url
from . import views
from django.contrib.auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetDoneView
from django.urls import path

urlpatterns = [
    path('register/', views.register, name='register'),
    path('home/', views.home),
    url(r'^$', views.home),
    path('login/',LoginView.as_view(template_name='accounts/login.html'),name="login"),
    path('logout/',LogoutView.as_view(template_name='accounts/logout.html'),name="logout"),
    path('profile/', views.view_profile, name='view_profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('change-password', views.change_password, name='change_password'),
    path('reset-password', PasswordResetView.as_view(), name='password_reset'),
    path('reset-password/done', PasswordResetDoneView.as_view(), name='password_reset_done')

]
