from django.urls import path, include # For routing URLs to specific views in your app.
from rest_framework.routers import DefaultRouter # For creating a router object to register our viewset.
from .views import TaskViewSet # Import the TaskViewSet viewset from the views.py file in the same directory.

router = DefaultRouter() # create a router object to register our viewset
router.register(r'tasks', TaskViewSet) # register the viewset with the router

# include the router.urls in the urlpatterns list to make the viewset accessible via the API endpoint /tasks
urlpatterns = [
    path('', include(router.urls)),
]