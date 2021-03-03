from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from .models import CustomUser, Employee


JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

class UserSerilaizers(serializers.HyperlinkedModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)   
        instance.save()
        return instance


    class Meta:
        model = CustomUser
        extra_kwargs = {'password': {'write_only': True}}
        fields = ('firstname', 'lastname', 'email', 'password', 'address', 'dob', 'company', 'active', 'staff','admin')


class UserLoginSerializer(serializers.Serializer):

    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password is not found.'
            )
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )
        return {
            'email':user.email,
            'token': jwt_token
        }

class EmployeeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Employee
		fields ='__all__'