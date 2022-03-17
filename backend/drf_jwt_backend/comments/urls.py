from django.urls import path
from comments import views

urlpatterns = [
    path('all/<int:post_id>/', views.get_all_comments),
    path('', views.create_comment),
    path('edit/<int:pk>/', views.update_comment),
    path('delete/<int:pk>/', views.delete_comment),
]