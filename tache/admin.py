from django.contrib import admin
from .models import Tache


# Register your models here.
@admin.register(Tache)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title','description','date_limit','status','profile','project')
