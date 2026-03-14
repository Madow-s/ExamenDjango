
from django.contrib import admin
from django.urls import path , include
from utilisateur.views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("project.urls")),
    path('', include("tache.urls")),
    path('', include("utilisateur.urls")),
    path('', include("Statistic.urls")),
    path('register/', register, name='register'),
    path('', home, name='home'),
    path('', include("django.contrib.auth.urls")),
    path('profile/', profile, name='profile'),
    path('profile/edit/', edit_profile, name='edit_profile'),

]

if settings.DEBUG:  # seulement en mode développement
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
