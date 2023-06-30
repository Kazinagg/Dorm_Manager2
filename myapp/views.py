from django.shortcuts import render
from django.http import JsonResponse
from .models import student_country_view, users_admins_view

def index(request):
    return render(request, 'index.html')

def get_students(request):
    students = student_country_view.objects.all().values()  # получаем все объекты Student
    students_list = list(students)  # преобразуем QuerySet в список словарей
    return JsonResponse(students_list, safe=False)

def get_admin(request):
    students = users_admins_view.objects.all().values()  # получаем все объекты Student
    students_list = list(students)  # преобразуем QuerySet в список словарей
    return JsonResponse(students_list, safe=False)
