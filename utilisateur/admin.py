from django.contrib import admin

from utilisateur.models import Profile


# Register your models here.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('get_username', 'role', 'avatar', 'get_password')
    list_filter = ('role',)            # filtre par rôle
    search_fields = ('user__username',)  # recherche par username

    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = 'Username'


    def get_password(self, obj):
        return obj.user.password
    get_password.short_description = 'Password'