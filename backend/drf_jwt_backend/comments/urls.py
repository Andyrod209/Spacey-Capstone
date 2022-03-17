from django.urls import path
from comments import views

urlpatterns = [
    path('all/<int:post_id>/', views.get_all_comments),
]