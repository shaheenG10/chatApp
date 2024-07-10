from django.urls import path
from .views import InterestListView, AcceptRejectInterestView

urlpatterns = [
    path('', InterestListView.as_view(), name='interest_list'),
    path('<int:pk>/<str:action>/', AcceptRejectInterestView.as_view(), name='accept_reject_interest'),

]