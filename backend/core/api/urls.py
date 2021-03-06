from django.urls import path
from .views import EmployeeCreate, EmployeeDelete, EmployeesList, UserLoginView, UserRegistrationView, EmployeeDetail, EmployeeUpdate, test_payment, save_stripe_info


urlpatterns = [
    path('', UserRegistrationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('employees/',EmployeesList.as_view()),
    path('employee/<str:pk>/',EmployeeDetail.as_view()),
    path('employee-create/',EmployeeCreate.as_view()),
    path('employees-update/<str:pk>/',EmployeeUpdate.as_view()),
    path('employees-delete/<str:pk>/',EmployeeDelete.as_view()),
    path('test-payment/',test_payment),
    path('save-stripe-info/',test_payment),
    ]