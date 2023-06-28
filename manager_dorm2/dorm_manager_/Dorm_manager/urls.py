from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # Добавьте здесь другие определения маршрутов
]