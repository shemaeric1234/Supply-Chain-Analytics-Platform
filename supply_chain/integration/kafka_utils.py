from kafka import KafkaProducer, KafkaConsumer
import time
import json
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def get_kafka_producer():
    producer = KafkaProducer(bootstrap_servers=['localhost:9092'])
    return producer

def get_kafka_consumer(topic, group_id):
    consumer = KafkaConsumer(
        topic,
        group_id=group_id,
        bootstrap_servers=['localhost:9092'],
        auto_offset_reset='earliest'
    )
    return consumer

def send_kafka_message(topic, message):
    producer = get_kafka_producer()
    # producer.send(topic, message.encode('utf-8'))
    # producer.flush()
    # Serialize the message dictionary into JSON format
    serialized_message = json.dumps(message).encode('utf-8')
    producer.send(topic, serialized_message)
    producer.flush()

        # Notify WebSocket group
    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
              
        "kafka_kafka_orders",  # Replace with your group name
        {
            "type": "receive",  # Match with the WebSocket consumer handler
            "message": message,  # Pass the original message
        }
    )

def consume_kafka_messages(topic, group_id, max_messages=10, timeout=5):
    """
    Consume a limited number of Kafka messages and return them.

    :param topic: Kafka topic to consume messages from.
    :param group_id: Consumer group ID.
    :param max_messages: Maximum number of messages to consume.
    :param timeout: Timeout in seconds to wait for messages.
    :return: List of consumed messages.
    """
    consumer = get_kafka_consumer(topic, group_id)
    messages = []
    count = 0
    start_time = time.time()

    # Keep consuming messages until max_messages is reached or timeout expires
    while count < max_messages:
        # If the timeout expires, break the loop
        if time.time() - start_time > timeout:
            break
        
        # Poll messages from the Kafka broker
        message = consumer.poll(timeout_ms=1)  # 1 second timeout for each poll
        
        # If messages are returned, process them
        if message:
            for topic_partition, msgs in message.items():
                for msg in msgs:
                   
                    messages.append(msg.value.decode('utf-8'))
                    print(f"Received: {msg.value.decode('utf-8')}")
                    count += 1

    consumer.close()

    # If no messages are consumed, log and return an empty list
    if not messages:
        print("No messages received from Kafka.")
        return "No messages received from Kafka."
    
    return messages

