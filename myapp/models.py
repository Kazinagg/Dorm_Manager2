# models.py
from django.db import models

class student_country_view(models.Model):
    student_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1)
    country_name = models.CharField(max_length=100)
    # phone = models.CharField(max_length=15, blank=True, default='')
    # email = models.EmailField(max_length=100, blank=True, default='')


    class Meta:
        db_table = 'student_country_view'

class countries(models.Model):
    country_id = models.IntegerField(primary_key=True)
    country_name = models.CharField(max_length=100)

    class Meta:
        db_table = 'countries'

class users_admins_view(models.Model):
    admin_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    # phone = models.CharField(max_length=15, blank=True, default='')
    # email = models.EmailField(max_length=100, blank=True, default='')

    class Meta:
        db_table = 'users_admins_view'




class student_info(models.Model):
    student_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1)
    country_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, blank=True, default='')
    username = models.CharField(max_length=50, blank=True, default='')
    password = models.CharField(max_length=50, blank=True, default='')
    email = models.EmailField(max_length=100, blank=True, default='')

    class Meta:
        db_table = 'student_info'
