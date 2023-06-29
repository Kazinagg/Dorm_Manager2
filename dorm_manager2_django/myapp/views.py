from django.shortcuts import render
from django.http import JsonResponse
from .models import Student

def index(request):
    return render(request, 'index.html')

def get_students(request):
    students = Student.objects.all().values()  # получаем все объекты Student
    students_list = list(students)  # преобразуем QuerySet в список словарей
    return JsonResponse(students_list, safe=False)
