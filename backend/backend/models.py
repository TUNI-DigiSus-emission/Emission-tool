from django.db import models

class Data(models.Model):
  name = models.CharField(max_length=255)
  expression = models.TextField()
  parameters = models.TextField()
  description = models.TextField()

  def __str__(self):
    return self.name