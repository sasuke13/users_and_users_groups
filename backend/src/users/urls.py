from django.urls import path

from users.views import UsersAPIView

urlpatterns = [
    path('', UsersAPIView.as_view(), name='users'),
    path('<int:user_id>/', UsersAPIView.as_view(), name='users_detailed_view'),
]
