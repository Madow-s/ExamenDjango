from django.contrib.auth.models import User
from django.db import models

from project.models import Project
from utilisateur.models import Profile


# Create your models here.


class Tache(models.Model):
    STATUS = (
        ('a_faire', 'À faire'),
        ('en_cours', 'En cours'),
        ('termine', 'Terminé'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    date_limit = models.DateTimeField()
    status = models.CharField( choices=STATUS, max_length=100, default='a_faire')
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="tasks_assigned")
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    created_by = models.ForeignKey(Profile, on_delete=models.SET_NULL,null=True)
    date_completion = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title
