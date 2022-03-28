from django.urls import path
from userProfile import views

urlpatterns = [
    path('get_profiles/', views.get_all_profiles),
    path('', views.profile_data),
    path('edit/<int:pk>/', views.edit_profile),

]
