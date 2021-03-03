from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
# Create your models here.


class UserManager(BaseUserManager):  
        def create_superuser(self, email, password=None, **extra_fields):
            if not email:
                raise ValueError("User must have an email")
            if not password:
                raise ValueError("User must have a password")

            user = self.model(
                email=self.normalize_email(email)
            )
            user.set_password(password)
            user.admin = True
            user.staff = True
            user.active = True
            user.save()
            return user


class CustomUser(AbstractUser):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    address  = models.CharField(max_length=150, blank=True, null=True)
    dob = models.CharField(max_length=10, blank=True, null=True)
    company = models.CharField(max_length=30, blank=True, null=True)

    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=True) 
    admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now = True)

    @staticmethod
    def has_perm(perm, obj=None):
         # "Does the user have a specific permission?"
         # Simplest possible answer: Yes, always
        return True

    @staticmethod
    def has_module_perms(app_label):
         # "Does the user have permissions to view the app `app_label`?"
         # Simplest possible answer: Yes, always
         return True

    @property
    def is_staff(self):
         # "Is the user a member of staff?"
         return self.staff

    @property
    def is_admin(self):
         # "Is the user a admin member?"
         return self.admin

    @property
    def is_active(self):
         # "Is the user active?"
         return self.active


class Employee(models.Model):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)
    address  = models.CharField(max_length=150, blank=True, null=True)
    dob = models.CharField(max_length=10, blank=True, null=True)
    company = models.CharField(max_length=30, blank=True, null=True)
    mobile = models.CharField(max_length=10, blank=True, null=True)
    city = models.CharField(max_length=30, blank=True, null=True)
