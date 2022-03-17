from django.urls import path
from posts import views

urlpatterns = [
    path('post/', views.get_all_post),
]