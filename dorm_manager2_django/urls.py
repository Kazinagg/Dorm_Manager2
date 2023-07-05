"""
URL configuration for dorm_manager2_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from myapp import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.urls import re_path

urlpatterns = [
    path('', views.index),
    path('admin/', admin.site.urls),
    path('api/data/', views.get_students),
    path('api/data/ollStudent/', views.get_ollStudents),
    path('api/data/addStudent/', views.add_ollStudents),
    path('api/auth/admin/', views.get_admin),
    path('api/auth/user/', views.get_users),
    path('api/countries/', views.get_countries),

    path('api/users/get/<int:user_id>', views.get_student, name='get_student'),
    # path('api/users/<int:studentId>', views.update_student, name='update_student'),
    path('api/usersint/<int:studentId>/change-password', views.change_password, name='change_password'),
    # path('api/users/<int:studentId>', views.delete_student, name='delete_student'),

    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


