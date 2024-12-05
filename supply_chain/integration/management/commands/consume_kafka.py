from django.core.management.base import BaseCommand
from kafka import KafkaConsumer
import json

class Command(BaseCommand):
    help = "Consume messages from a Kafka topic"

    def add_arguments(self, parser):
        parser.add_argument(
            '--topic',
            type=str,
            help='The Kafka topic to consume from',
            required=True,
        )
        parser.add_argument(
            '--group',
            type=str,
            help='The Kafka consumer group ID',
            default='default-group',
        )

    def handle(self, *args, **options):
        topic = options['topic']
        group_id = options['group']

        # Kafka consumer setup
        self.stdout.write(self.style.SUCCESS(f"Connecting to Kafka topic '{topic}' in group '{group_id}'"))
        
        try:
            consumer = KafkaConsumer(
                topic,
                group_id=group_id,
                bootstrap_servers=['kafka_container_name:9092'],  # Adjust for your setup
                auto_offset_reset='earliest',
                enable_auto_commit=True,
                value_deserializer=lambda x: json.loads(x.decode('utf-8')),
            )

            self.stdout.write(self.style.SUCCESS(f"Listening to topic '{topic}'..."))

            # Process messages
            for message in consumer:
                self.stdout.write(self.style.WARNING(f"Message received: {message.value}"))
                self.process_message(message.value)

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error: {e}"))

    def process_message(self, message):
        """
        Custom logic to process each Kafka message.
        Modify this function as needed.
        """
        # Example: Print the message
        self.stdout.write(self.style.SUCCESS(f"Processing message: {message}"))
