from django.db import models

# Create your models here.

class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    role = models.CharField(max_length=50)

    class Meta:
        db_table = 'users'

class Admin(models.Model):
    admin_id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField()
    
    class Meta:
        db_table = 'admins'

class Admin(models.Model):
    admin_id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'admins'

class Country(models.Model):
    country_id = models.IntegerField(primary_key=True)
    country_name = models.CharField(max_length=100)

    class Meta:
        db_table = 'countries'

class Student(models.Model):
    student_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = 'students'

class Room(models.Model):
    room_id = models.IntegerField(primary_key=True)
    floor = models.IntegerField()
    room_number = models.IntegerField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'rooms'

class Residence(models.Model):
    residence_id = models.IntegerField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    move_in_date = models.DateField()
    move_out_date = models.DateField(null=True)

    class Meta:
        db_table = 'residence'

