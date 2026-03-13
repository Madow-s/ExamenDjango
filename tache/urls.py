from django.urls import path
from .import views


urlpatterns = [
    path('tache/', views.tache, name='tache'),
    path('tache/<int:pk>', views.tache_detail, name='tache-detail'),
]


# endpoints:
# GET_ALL_TACHE_and_CREATE_NEW_TACHE = "127.0.0.1:8008/tache/"
# GET_SPECIFIC_TACHE = "127.0.0.1:8008/tache/id_tache"