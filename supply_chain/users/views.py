from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer

# signup relate import
from rest_framework import status
from django.contrib.auth import get_user_model

#JWT token imports
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny


class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access to login

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Authenticate the user
        user = authenticate(username=username, password=password)
        
        if user:
            # Create JWT Token for the authenticated user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Return the access token and refresh token
            return Response({
                "access": access_token,
                "refresh": refresh_token,
                "role": user.role
            })

        # If user is not found, return an error response
        return Response({"error": "Invalid credentials, username or password are incorrect."}, status=400)


class SignupView(APIView):
    def post(self, request):
        # Get user data from request
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Create the new user
            user = serializer.save()
            # Generate authentication token for the user (optional)
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
