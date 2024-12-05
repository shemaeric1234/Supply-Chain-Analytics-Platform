"""
URL configuration for supply_chain project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from inventory.views import ProductViewSet
from orders.views import OrderViewSet
from analytics.views import DashboardView
from integration.views import send_kafka_messages,consume_kafka_messages_view


router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')
router.register(r'orders', OrderViewSet, basename='orders')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('users/', include('users.urls')),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('send-kafka-message/', send_kafka_messages, name='send_kafka_message'),
    path('consume/<str:topic>/', consume_kafka_messages_view, name='consume_kafka_messages_view'),
]