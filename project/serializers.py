from rest_framework import serializers
from project.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source='created_by.user.username', read_only=True)

    class Meta:
        model = Project
        fields = ['id','title', 'description', 'created_at', 'created_by']
        read_only_fields = ['created_by']

    def create(self, validated_data):
        user = self.context['request'].user
        if not user.is_authenticated:
            raise serializers.ValidationError("Utilisateur non connecté")

        profile = user.profile  # on utilise le profile comme FK
        return super().create({**validated_data, "created_by": profile})