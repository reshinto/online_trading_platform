from rest_framework import generics, permissions
# send response from this api
from rest_framework.response import Response
# tokens use from knox
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    # emails, passwords etc will be sent from here
    def post(self, request, *args, **kwargs):
        # any data that comes in from request will be passed into serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "bearer": AuthToken.objects.create(user)[1]
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "bearer": AuthToken.objects.create(user)[1]
        })


# Get User API
class UserAPI(generics.RetrieveAPIView):
    # ensure token is available and correct before getting data
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
