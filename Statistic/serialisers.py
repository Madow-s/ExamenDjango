from rest_framework import serializers
from tache.models import Tache
from utilisateur.models import Profile
from django.contrib.auth.models import User

class TacheSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tache
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model = Profile
        fields = ['user', 'role', 'avatar']