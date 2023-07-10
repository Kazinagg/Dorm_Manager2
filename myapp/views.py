from django.shortcuts import render
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponse
from .models import student_country_view, users_admins_view, student_info, Users, Countries, Students
from django.db import connection
import json
from django.shortcuts import render
# from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from .models import student_info, Users
from django.forms.models import model_to_dict

def get_student(request, user_id):
    student = model_to_dict(student_info.objects.get(user_id=user_id))

    return JsonResponse(student)

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

# def change_password(request, studentId):
#     student = get_object_or_404(student_info, student_id=studentId)
#     student.password = request.POST.get('password')
#     student.save()
#     return HttpResponse(status=200)


# def change_password(request, user_id):
#   if request.method == 'POST':
#     data = json.loads(request.body)
#     password = data.get('password')
#     try:
#       user = Users.objects.get(user_id=user_id)
#       user.password = password
#       user.save()
#       return JsonResponse({'message': 'Password changed successfully'}, status=200)
#     except Users.DoesNotExist:
#       return JsonResponse({'message': 'User not found'}, status=404)
#   else:
#     return JsonResponse({'message': 'Invalid request method'}, status=405)

# Save user view
def save_user(request):
    data = json.loads(request.body)
    with connection.cursor() as cursor:
        cursor.execute("SELECT update_student_info(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                       [data['student_id'], data['first_name'], data['last_name'], data['birth_date'], data['gender'], data['country_id'], data['phone'], data['username'], data['password'], data['email']])
        return HttpResponse('OK')
# def save_user(request, user_id):
#   if request.method == 'PUT':
#     data = json.loads(request.body)
#     user = data.get('user')
#     try:
#       student = Students.objects.get(user_id=user_id)
#       student.first_name = user.get('first_name')
#       student.last_name = user.get('last_name')
#       student.birth_date = user.get('birth_date')
#       student.gender = user.get('gender')
#       student.country_id = user.get('country_id')
#       student.phone = user.get('phone')
#       student.email = user.get('email')
#       student.save()
#       return JsonResponse({'message': 'User saved successfully'}, status=200)
#     except Students.DoesNotExist:
#       return JsonResponse({'message': 'Student not found'}, status=404)
#   else:
#     return JsonResponse({'message': 'Invalid request method'}, status=405)

# Cancel edit view

def cancel_edit(request, user_id):
  if request.method == 'GET':
    try:
      student = Students.objects.get(user_id=user_id)
      user = {
        'first_name': student.first_name,
        'last_name': student.last_name,
        'birth_date': student.birth_date,
        'gender': student.gender,
        'country_id': student.country_id,
        'phone': student.phone,
        'email': student.email,
      }
      return JsonResponse(user, status=200)
    except Students.DoesNotExist:
      return JsonResponse({'message': 'Student not found'}, status=404)
  else:
    return JsonResponse({'message': 'Invalid request method'}, status=405)



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

# @csrf_exempt
def update_ollStudents(request, student_id):
    if request.method == 'POST':
        # Получение данных студента из тела запроса
        data = json.loads(request.body)
        # Получение объекта студента из базы данных
        student = Students.objects.get(pk=student_id)
        # Обновление данных студента
        student.first_name = data.get('first_name', student.first_name)
        student.last_name = data.get('last_name', student.last_name)
        student.birth_date = data.get('birth_date', student.birth_date)
        student.gender = data.get('gender', student.gender)
        student.country_id = data.get('country_id', student.country_id)
        student.phone = data.get('phone', student.phone)
        student.email = data.get('email', student.email)
        # Сохранение изменений в базе данных
        student.save()
        # Возвращение обновленных данных студента в ответе
        return JsonResponse({
            'student_id': student.student_id,
            'first_name': student.first_name,
            'last_name': student.last_name,
            'birth_date': student.birth_date,
            'gender': student.gender,
            'country_id': student.country_id,
            'phone': student.phone,
            'email': student.email,
        })
    else:
        return HttpResponseNotAllowed(['POST'])
    

def delete_student(request, student_id):
    try:
        student = Students.objects.get(student_id=student_id)
        student.delete()
        return JsonResponse({'message': 'Student was deleted successfully!'}, status=200)
    except Students.DoesNotExist:
        return JsonResponse({'error': 'Student not found!'}, status=404)

def add_ollStudents(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        with connection.cursor() as cursor:
            cursor.execute("SELECT add_student(%s, %s, %s, %s, %s, %s, %s)", [
                data['first_name'],
                data['last_name'],
                data['birth_date'],
                data['gender'],
                data['country_id'],
                data['phone'],
                data['email']
            ])
        return JsonResponse({'message': 'Student added successfully'})
