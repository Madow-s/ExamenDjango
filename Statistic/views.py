
from django.db import models
from rest_framework.decorators import api_view
from rest_framework.response import Response
from tache.models import Tache
from django.db.models import F

from utilisateur.models import Profile


@api_view(['GET'])
def statistiques(request):
    total = Tache.objects.count()
    termine = Tache.objects.filter(status='termine').count()
    dans_delai = Tache.objects.filter(
        status='termine',
        date_limit__lte=F('date_limit')
    ).count()

    taux = (dans_delai / total * 100) if total > 0 else 0

    data = {
        "total_taches": total,
        "taches_terminees": termine,
        "respect_delai": dans_delai,
        "taux_reussite": taux
    }

    return Response(data)







def prime_professeur(profile):
    # Vérifier si l'utilisateur est un professeur
    if profile.role != 'PROFESSEUR':
        return 0

    # Récupérer toutes les tâches assignées à ce profil
    taches = Tache.objects.filter(profile=profile)

    total = taches.count()
    if total == 0:
        return 0

    dans_delai = taches.filter(
        status='termine',
        date_completion__lte=F('date_limit')
    ).count()

    taux = (dans_delai / total) * 100

    if taux == 100:
        return 100_000
    elif taux >= 90:
        return 30_000
    else:
        return 0




@api_view(['GET'])
def primes(request):

    professeurs = Profile.objects.filter(role='Professeur')

    data = []

    for prof in professeurs:
        data.append({
            "username": prof.user.username,
            "prime": prime_professeur(prof)
        })

    return Response(data)