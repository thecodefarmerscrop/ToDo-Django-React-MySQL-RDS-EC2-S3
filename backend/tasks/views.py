# A ViewSet is a class-based view that provides actions like:
# list, create, retrieve, update, and destroy on a model.
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet): # Create a new class called TaskViewSet
    queryset = Task.objects.all() # Set the queryset to all tasks
    serializer_class = TaskSerializer # Set the serializer class to TaskSerializer
    