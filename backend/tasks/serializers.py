from rest_framework import serializers
from .models import Task

# Create a new class called TaskSerializer that links the Task model to the TaskSerializer
class TaskSerializer(serializers.ModelSerializer):
    class Meta: # Create a new class called Meta
        model = Task # Set the model to Task
        fields = '__all__' # Set the fields to all fields in the model