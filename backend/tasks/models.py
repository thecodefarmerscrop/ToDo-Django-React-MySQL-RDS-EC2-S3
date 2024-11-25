from django.db import models

class Task(models.Model): # Create a model called Task
    title = models.CharField(max_length=100) # Add a title field
    completed = models.BooleanField(default=False) # Add a completed field

    def __str__(self): # Add a string method to return the title
        return self.title # Return the title
