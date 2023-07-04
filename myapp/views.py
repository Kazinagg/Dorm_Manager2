from django.shortcuts import render
from django.http import JsonResponse
from .models import student_country_view, users_admins_view, student_info
from django.db import connection
import json
from django.shortcuts import render
from .models import countries



def index(request):
    return render(request, 'index.html')

def get_students(request):
    students = student_country_view.objects.all().values()  # получаем все объекты Student
    students_list = list(students)  # преобразуем QuerySet в список словарей
    return JsonResponse(students_list, safe=False)

def get_admin(request):
    admin = users_admins_view.objects.all().values()  # получаем все объекты Student
    admin_list = list(admin)  # преобразуем QuerySet в список словарей
    return JsonResponse(admin_list, safe=False)

def get_countries(request):
    Country_1 = countries.objects.all().values()  # получаем все объекты Student
    Country_list = list(Country_1)  # преобразуем QuerySet в список словарей
    return JsonResponse(Country_list, safe=False)

def get_ollStudents(request):
    students = student_info.objects.all().values()  # получаем все объекты Student
    students_list = list(students)  # преобразуем QuerySet в список словарей
    return JsonResponse(students_list, safe=False)

def add_ollStudents(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        with connection.cursor() as cursor:
            cursor.execute("SELECT add_student(%s, %s, %s, %s, %s, %s, %s, %s, %s)", [
                data['student_id'],
                data['first_name'],
                data['last_name'],
                data['birth_date'],
                data['gender'],
                data['country_id'],
                data['phone'],
                data['user_id'],
                data['email']
            ])
        return JsonResponse({'message': 'Student added successfully'})
