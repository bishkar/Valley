from django.contrib import admin

# add grade model to admin panel
from .models import Grade

admin.site.register(Grade)
