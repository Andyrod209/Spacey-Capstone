from xml.etree.ElementInclude import include
from django.urls import path
from posts import views

urlpatterns = [
    path('view_posts/', views.get_all_post),
    path('', views.create_post),
    path('edit/<int:pk>/', views.update_post),
    path('delete/<int:pk>/', views.delete_post),
]