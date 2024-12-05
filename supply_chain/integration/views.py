from django.http import JsonResponse
from .hadoop_utils import upload_file_to_hdfs
from .kafka_utils import send_kafka_message,consume_kafka_messages
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def upload_to_hdfs(request):
    if request.method == 'POST':
        local_path = request.FILES['file'].temporary_file_path()
        hdfs_path = f'/uploaded_files/{request.FILES["file"].name}'
        upload_file_to_hdfs(local_path, hdfs_path)
        return JsonResponse({'message': 'File uploaded to HDFS successfully!'})
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def send_kafka_messages(request):
    if request.method == 'POST':
        try:
            # Parse request data
            data = json.loads(request.body)
            topic = data.get('topic', None)
            message = data.get('message', '')

            send_kafka_message(topic,message)
            return JsonResponse({'status': 'success', 'message': 'Message sent to Kafka'}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

@csrf_exempt
def consume_kafka_messages_view(request, topic):
    """
    Consume messages from a Kafka topic and return them as a JSON response.
    """
    # Default group ID and max number of messages (you can modify these defaults as needed)
    group_id = request.GET.get('group_id', 'default-group')
    max_messages = int(request.GET.get('max_messages', 10))  # Default to 10 messages

    try:
        messages = consume_kafka_messages(topic, group_id, max_messages)
        print('messages:',messages)
        return JsonResponse({"status": "success", "messages": messages}, status=200)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)