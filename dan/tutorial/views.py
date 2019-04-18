from django.shortcuts import redirect

def login_redirect(request):
    return redirect('/account/login')

def logout_redirect(request):
    return redirect('/account/logout')

def home_redirect(request):
    return redirect('/account/home')
