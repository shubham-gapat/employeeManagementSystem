from .models import Employee
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerilaizers, UserLoginSerializer, EmployeeSerializer
import stripe


stripe.api_key='sk_test_'


class UserRegistrationView(CreateAPIView):

    serializer_class = UserSerilaizers
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        status_code = status.HTTP_201_CREATED
        response = {
            'success' : 'True',
            'status_code' : status_code,
            'message': 'User registered  successfully',
            }
        
        return Response(response, status=status_code)


class UserLoginView(RetrieveAPIView):

    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'User logged in  successfully',
            'token' : serializer.data['token'],
            }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)


class EmployeesList(ListAPIView):

    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request):
        try:
            employees = Employee.objects.all().order_by('-id')
            serializer = EmployeeSerializer(employees, many=True)
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': status_code,
                'employees': serializer.data
            }
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                    'success': 'false',
                    'status code': status.HTTP_400_BAD_REQUEST,
                    'message': 'User does not exists',
                    'error': str(e)
                }
        return Response(response, status=status_code)


class EmployeeDetail(ListAPIView):

    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(request, pk):
        try:
            employees = Employee.objects.get(id=pk)
            serializer = EmployeeSerializer(employees, many=False)
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': status_code,
                'data': serializer.data
            }
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                    'success': 'false',
                    'status code': status.HTTP_400_BAD_REQUEST,
                    'message': 'User does not exists',
                    'error': str(e)
                }
        return Response(response, status=status_code)



class EmployeeCreate(CreateAPIView):

    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def post(self, request):
        try:
            serializer = EmployeeSerializer(data=request.data)
            status_code = status.HTTP_200_OK
            if serializer.is_valid():
                serializer.save()

            response = {
                'success': 'true',
                'status code': status_code,
                'data': serializer.data
            }
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                    'success': 'false',
                    'status code': status.HTTP_400_BAD_REQUEST,
                    'message': 'Something went wrong',
                    'error': str(e)
                }
        return Response(response, status=status_code)


class EmployeeUpdate(UpdateAPIView):

    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def post(request, pk):
        try:
            employees = Employee.objects.get(id=pk)
            serializer = Employee(instance=employees, data=request.data)
            status_code = status.HTTP_200_OK
            if serializer.is_valid():
                serializer.save()
            response = {
                'success': 'true',
                'status code': status_code,
                'data': serializer.data
            }
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                    'success': 'false',
                    'status code': status.HTTP_400_BAD_REQUEST,
                    'message': 'Something went wrong',
                    'error': str(e)
                }
        return Response(response, status=status_code)


class EmployeeDelete(RetrieveAPIView):
    def delete(request, pk):
        try:
            employee = Employee.objects.get(id=pk)
            employee.delete()
            status_code = status.HTTP_200_OK
            response = {
                    'success': 'true',
                    'status code': status_code,
                    'message': 'Item succsesfully delete!'
                }
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                    'success': 'false',
                    'status code': status.HTTP_400_BAD_REQUEST,
                    'message': 'Something went wrong',
                    'error': str(e)
                }
        return Response(response, status=status_code)
	

@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
    amount=1000, currency='pln', 
    payment_method_types=['card'],
    receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


def save_stripe_info(request):
    data = request.data
    email = data['email']
    payment_method_id = data['payment_method_id']
    
    # creating customer
    customer = stripe.Customer.create(
      email=email, payment_method=payment_method_id)
     
    return Response(status=status.HTTP_200_OK, 
      data={
        'message': 'Success', 
        'data': {'customer_id': customer.id}   
      })