from django.http import JsonResponse
from django.shortcuts import render
from django.db import models
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet
from django.db.models import Count
from datetime import date
from tache.models import Tache
from tache.serializers import TacheSerializer


@api_view(['GET', 'POST'])
def tache(request):
    if request.method == 'GET':
        taches = Tache.objects.all()
        serializer = TacheSerializer(taches, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TacheSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def tache_detail(request, pk):
    try:
        tache = Tache.objects.get(pk=pk)
    except Tache.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TacheSerializer(tache)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TacheSerializer(tache, data=request.data,  context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        tache.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TacheViewSet(ModelViewSet):
    queryset = Tache.objects.all()
    serializer_class = TacheSerializer

