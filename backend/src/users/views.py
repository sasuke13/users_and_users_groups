from rest_framework.views import APIView

from core.base_api import ApiBaseView


class UsersAPIView(APIView, ApiBaseView):
    def post(self, request):
        pass
