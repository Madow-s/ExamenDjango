from django.urls import path
from .import views


urlpatterns = [
    path('project/', views.project, name='project'),
    path('project/<int:pk>', views.project_detail, name='project-detail'),
    path('search_projects/', views.search_projects, name='search_projects'),
]


# endpoints:
# GET_ALL_PROJECT_and_CREATE_NEW_PROJECT = "127.0.0.1:8008/project/"
# GET_SPECIFIC_PROJECT = "127.0.0.1:8008/project/id_project"