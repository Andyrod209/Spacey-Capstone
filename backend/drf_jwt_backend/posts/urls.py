from django.urls import path
from posts import views

urlpatterns = [
    path('view_posts/', views.get_all_post),
    path('', views.create_post),
]