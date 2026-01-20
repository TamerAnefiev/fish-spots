from rest_framework import serializers
from django.contrib.auth import get_user_model


UserModel = get_user_model()


class UserMeSerializer(serializers.ModelSerializer):
    isAdmin = serializers.BooleanField(source="is_superuser")

    class Meta:
        model = UserModel
        fields = ("id", "email", "first_name", "last_name", "picture", "isAdmin")
