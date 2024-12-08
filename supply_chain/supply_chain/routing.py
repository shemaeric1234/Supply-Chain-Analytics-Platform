from django.urls import path
from integration.consumers import  KafkaConsumer

websocket_urlpatterns = [
    path('ws/kafka/',KafkaConsumer.as_asgi()),
]
