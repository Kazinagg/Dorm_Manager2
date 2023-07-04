from django.shortcuts import render
from django.http import JsonResponse
from .models import student_country_view, users_admins_view, student_info, Users, Countries
from django.db import connection
import json
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from .models import student_info, Users

def get_student(request, studentId):
    student = get_object_or_404(student_info, student_id=studentId)
    student_data = {
        'student_id': student.student_id,
        'first_name': student.first_name,
        'last_name': student.last_name,
        'birth_date': student.birth_date,
        'gender': student.gender,
        'country_name': student.country_name,
        'phone': student.phone,
        'username': student.username,
        'password': student.password,
        'email': student.email,
    }
    return JsonResponse(student_data)

def update_student(request, studentId):
    student = get_object_or_404(student_info, student_id=studentId)
    student.first_name = request.POST.get('first_name')
    student.last_name = request.POST.get('last_name')
    student.birth_date = request.POST.get('birth_date')
    student.gender = request.POST.get('gender')
    student.country_name = request.POST.get('country_name')
    student.phone = request.POST.get('phone')
    student.username = request.POST.get('username')
    student.password = request.POST.get('password')
    student.email = request.POST.get('email')
    student.save()
    student_data = {
        'student_id': student.student_id,
        'first_name': student.first_name,
        'last_name': student.last_name,
        'birth_date': student.birth_date,
        'gender': student.gender,
        'country_name': student.country_name,
        'phone': student.phone,
        'username': student.username,
        'password': student.password,
        'email': student.email,
    }
    return JsonResponse(student_data)

def change_password(request, studentId):
    student = get_object_or_404(student_info, student_id=studentId)
    student.password = request.POST.get('password')
    student.save()
    return HttpResponse(status=200)

def delete_student(request, studentId):
    student = get_object_or_404(student_info, student_id=studentId)
    student.delete()
    return HttpResponse(status=200)



def index(request):
    return render(request, 'index.html')

def get_students(request):
    students = student_country_view.objects.all().values()  # получаем все объекты Student
    students_list = list(students)  # преобразуем QuerySet в список словарей
    return JsonResponse(students_list, safe=False)

def get_users(request):
    users = Users.objects.all().values()  # получаем все объекты Student
    Users_list = list(users)  # преобразуем QuerySet в список словарей
    return JsonResponse(Users_list, safe=False)

def get_admin(request):
    admin = users_admins_view.objects.all().values()  # получаем все объекты Student
    admin_list = list(admin)  # преобразуем QuerySet в список словарей
    return JsonResponse(admin_list, safe=False)

def get_countries(request):
    Country_1 = Countries.objects.all().values()  # получаем все объекты Student
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
