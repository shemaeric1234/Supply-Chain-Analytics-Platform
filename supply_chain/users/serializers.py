from rest_framework import serializers
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Password is write-only
    
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password', 'role']
    
    def create(self, validated_data):
        # Create the user using the custom 'User' model
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],  # Automatically hashed by `create_user`
            role=validated_data['role']
        )
        return user
