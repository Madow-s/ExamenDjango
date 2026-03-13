from django.db import models

from utilisateur.models import Profile


# Create your models here.


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(Profile,on_delete=models.SET_NULL,null=True,)

    def __str__(self):
        return self.title

