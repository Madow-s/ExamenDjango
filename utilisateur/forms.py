from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import Profile


class RegisterUser(UserCreationForm):
    email = forms.EmailField()
    ROLE_CHOICES = (
        ('ETUDIANT', 'Etudiant'),
        ('PROFESSEUR', 'Professeur'),
    )
    role = forms.ChoiceField(choices=ROLE_CHOICES)

    username = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control form-control-sm'})
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control form-control-sm'})
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control form-control-sm'})
    )

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')



class ProfileForm(forms.ModelForm):
    # champs User que l'on veut modifier
    username = forms.CharField(max_length=150)
    email = forms.EmailField()

    class Meta:
        model = Profile
        fields = ['avatar']


    def save(self, commit=True):
        profiles = Profile.objects.select_related("user").all()
        if commit:
            profiles.save()

            Profile.objects.create(
                profiles=profiles,
                role=self.cleaned_data["role"]
            )

        return profiles