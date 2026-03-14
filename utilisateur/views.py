from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from rest_framework.permissions import IsAuthenticated

from .forms import *
from .models import Profile
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from utilisateur.models import Profile
from utilisateur.serializers import ProfileSerializer

def register(response):
    if response.method == 'POST':
        form = RegisterUser(response.POST)
        if form.is_valid():
            user = form.save()
            # Création du profile avec rôle
            Profile.objects.create(
                user=user,
                role=form.cleaned_data['role']
            )
            return redirect('/login')
    else:
        form = RegisterUser()
    return render(response, 'utilisateur/register.html', {'form': form})


def home(request):
    return render(request, 'Home/home.html')


# Page profil
@login_required
def profile(request):
    return render(request, 'utilisateur/profile.html')



@login_required
def edit_profile(request):
    profile = request.user.profile
    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            # mettre à jour le User
            request.user.username = form.cleaned_data['username']
            request.user.email = form.cleaned_data['email']
            request.user.save()

            # mettre à jour le Profile
            form.save()
            return redirect('profile')
    else:
        form = ProfileForm(
            instance=profile,
            initial={
                'username': request.user.username,
                'email': request.user.email
            }
        )
    return render(request, 'utilisateur/edit_profile.html', {'form': form})




@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])

def profile(request):

    if request.method == 'GET':
        profiles = Profile.objects.select_related("user").all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@permission_classes([IsAuthenticated])
@api_view(['GET', 'PUT'])
def my_profile(request):

    profile = Profile.objects.get(user=request.user)

    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


    elif request.method == "PUT":

        user = request.user

        profile = Profile.objects.get(user=user)

        user.username = request.data.get("username", user.username)

        user.email = request.data.get("email", user.email)

        user.save()

        serializer = ProfileSerializer(profile)

        return Response(serializer.data)





@api_view(['GET', 'PUT', 'DELETE'])
def profile_detail(request, pk):

    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

from .forms import RegisterUser
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def register_user(request):
    form = RegisterUser(request.data)

    if form.is_valid():
        user = form.save()  # crée l'utilisateur

        # Créer automatiquement le profil
        role = form.cleaned_data.get('role')  # récupère le rôle choisi
        Profile.objects.create(user=user, role=role)  # crée le profile lié au user

        return Response({
            "message": "Utilisateur créé avec profil"
        })
    else:
        print(form.errors)  # pour debug
        return Response(form.errors, status=400)




@api_view(['POST'])
def login_user(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)

        return Response({
            "message": "Connexion réussie",
            "password":user.password,
            "username": user.username
        })

    return Response({
        "error": "Identifiants invalides"
    }, status=400)







@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({
        "message": "Déconnexion réussie"
    })