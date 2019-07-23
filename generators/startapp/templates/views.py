"""
This file is where you should write your views that will be processed by the urls.py file in this directory.
There are settings for both class-based views and function-based views depending on your preference.
"""

# CBV SETTINGS HERE
from django.db.models import Q, Sum
from django.db.models.functions import Lower
from django.views.generic import TemplateView, ListView, DetailView

# FBV SETTINGS HERE
from django.shortcuts import render

# SOME HELPFUL FUNCTIONS HERE
from django.db.models import (
    F, Func, Max, OuterRef, Subquery, Sum, Count, Case, When, Value, Q
)
from django.db.models.functions import Cast, Coalesce
