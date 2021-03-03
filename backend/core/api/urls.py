from django.urls import path
from .views import EmployeeCreate, EmployeeDelete, EmployeesList, UserLoginView, UserRegistrationView, EmployeeDetail, EmployeeUpdate


urlpatterns = [
    path('', UserRegistrationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('employees/',EmployeesList.as_view()),
    path('employee/<str:pk>/',EmployeeDetail.as_view()),
    path('employee-create/',EmployeeCreate.as_view()),
    path('employees-update/<str:pk>/',EmployeeUpdate.as_view()),
    path('employees-delete/<str:pk>/',EmployeeDelete.as_view()),
    ]