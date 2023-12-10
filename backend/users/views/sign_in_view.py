from django.conf import settings
from django.contrib.auth import authenticate
from django.utils import timezone

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class SignInAPIView(APIView):
    """
    Authenticates the user and returns an access token and
    a refresh token, set as HTTP-only, upon successful authentication.
    """
    permission_classes = [AllowAny,]

    def post(self, request):
        data = request.data
        user = authenticate(email=data.get('email'), password=data.get('password'))

        # demo functionality prevents users from logging in with any account other than the predefined one.
        if user and str(user.id) != "5ba232af-bc93-4d1b-81ce-b17761773282":
            return Response(data={"error": "Please sign in as Email: demo@app.com Password: demouser."}, status=status.HTTP_401_UNAUTHORIZED)

        # in case we don't delete the users but deactivate them
        if not user or not user.is_active:
            return Response(data={"error": "Invalid credentials. Please check your email and password and try again."}, status=status.HTTP_401_UNAUTHORIZED)

        refresh_token = RefreshToken.for_user(user)

        response = Response()
        response.set_cookie(key='refreshToken', value=str(refresh_token), httponly=True)
        response.set_cookie(key='accessToken', value=str(refresh_token.access_token), httponly=True)

        access_token_lifetime = settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"]
        refresh_token_lifetime = settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"]
        response.data = {
            "username": user.username,
            "email": user.email,
            "last_login": user.last_login,
            "access_token_lifetime": access_token_lifetime,
            "refresh_token_lifetime": refresh_token_lifetime
        }
        response.status = status.HTTP_200_OK

        user.last_login = timezone.now()
        user.save()
        return response