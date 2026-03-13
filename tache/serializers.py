from rest_framework import serializers
from tache.models import Tache


class TacheSerializer(serializers.ModelSerializer):
    project_title = serializers.CharField(source="project.title", read_only=True)
    profile_username = serializers.CharField(source="profile.user.username", read_only=True)


    class Meta:
        model = Tache
        fields = ['id','title','description','date_limit','status','profile','profile_username','project','project_title', 'created_by']
        read_only_fields = ['created_by']

        def create(self, validated_data):
            user = self.context['request'].user
            if not user.is_authenticated:
                raise serializers.ValidationError("Utilisateur non connecté")

            profile = user.profile
            return super().create({**validated_data, "created_by": profile})



        def update(self, instance, validated_data):
            # Mettre à jour les champs comme d'habitude
            instance = super().update(instance, validated_data)

            # Gestion automatique de la date de complétion
            if instance.status == 'termine' and instance.date_completion is None:
                instance.date_completion = datetime.date.today()
                instance.save()
            elif instance.status != 'termine':
                instance.date_completion = None
                instance.save()

            return instance