from django.urls import path
from replies import views

urlpatterns = [
    path('all/<int:comment_id>/', views.get_all_replies),
    path('', views.create_reply),
    path('edit/<int:pk>/', views.update_reply),
    path('delete/<int:pk>/', views.delete_reply),
]