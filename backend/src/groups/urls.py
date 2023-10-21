from django.urls import path

from groups.views import GroupsAPIView

urlpatterns = [
    path('', GroupsAPIView.as_view(), name='groups_logic'),
    path('<int:group_id>/', GroupsAPIView.as_view(), name='groups_detailed_view_logic')
]
