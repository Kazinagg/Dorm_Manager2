from django.http import JsonResponse
from .models import YourModel

def get_data(request):
    data = list(YourModel.objects.values())
    return JsonResponse(data, safe=False)


