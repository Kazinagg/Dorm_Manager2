# models.py
from django.db import models

class Student(models.Model):
    student_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1)
    country_id = models.IntegerField(null=True, blank=True)
    phone = models.CharField(max_length=15, blank=True, default='')
    email = models.EmailField(max_length=100, blank=True, default='')

    class Meta:
        db_table = 'students'

