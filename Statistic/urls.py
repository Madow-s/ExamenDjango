from django.urls import path
from . import views

urlpatterns = [
    path('statistiques/', views.statistiques, name='statistiques'),
    path('primes/', views.primes, name='primes')
]



# endpoints:
# GET_ALL_STATISTIC = "127.0.0.1:8008/statistiques/"
# GET_ALL_PRIME = "127.0.0.1:8008/primes/"