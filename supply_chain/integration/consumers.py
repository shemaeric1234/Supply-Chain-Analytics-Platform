import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
# from orders.models import Order  # Your order model
from integration.kafka_utils import consume_kafka_messages  # Your Kafka consumption utility

class KafkaConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Accept WebSocket connection
        self.room_name = "kafka_orders"
        self.room_group_name = f'kafka_{self.room_name}'

        # Join WebSocket group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Accept the connection
        await self.accept()

    async def disconnect(self, close_code):
        # Leave WebSocket group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        print(f"Received data: {text_data}")
        # Receive message from WebSocket
        data = json.loads(text_data)
        topic = data.get('topic', 'orders')
        group_id = data.get('group_id', 'default-group')
        max_messages = data.get('max_messages', 10)

        # Consume Kafka messages
        messages = consume_kafka_messages(topic, group_id, max_messages)

        # Send messages to WebSocket
        for message in messages:
            await self.send(text_data=json.dumps({
                'message': message
            }))
