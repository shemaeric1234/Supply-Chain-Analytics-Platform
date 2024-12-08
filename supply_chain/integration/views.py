from django.http import JsonResponse
from .hadoop_utils import upload_file_to_hdfs,read_file_from_hdfs
from .kafka_utils import send_kafka_message,consume_kafka_messages
import tempfile
from django.core.files.uploadedfile import InMemoryUploadedFile
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from integration.utils import fetch_mapreduce_results,export_inventory_to_csv,export_order_to_csv,export_order_to_csv
from orders.models import Order
from inventory.models import Product
from users.models import User


@csrf_exempt
def upload_to_hdfs(request):
    if request.method == 'POST':
        uploaded_file = request.FILES['file']
        hdfs_path = f'/uploaded_files/{uploaded_file.name}'
        
        # Check if the file is an InMemoryUploadedFile
        if isinstance(uploaded_file, InMemoryUploadedFile):
            with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                for chunk in uploaded_file.chunks():
                    temp_file.write(chunk)
                local_path = temp_file.name
        else:
            # For TemporaryUploadedFile, use the temporary_file_path method
            local_path = uploaded_file.temporary_file_path()

        # Call the function to upload the file to HDFS
        upload_file_to_hdfs(local_path, hdfs_path)

        return JsonResponse({'message': 'File uploaded to HDFS successfully!'})

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def read_file_from_hdfs(request):
    if request.method == 'GET':
        files = read_file_from_hdfs()
        return JsonResponse({'message': 'File downloaded from HDFS successfully!',"files":files})
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
    Consume messages from Kafka, save them as orders, and return a JSON response.
    """
    group_id = request.GET.get('group_id', 'default-group')
    max_messages = int(request.GET.get('max_messages', 10))
    
    try:
        # Consume messages from Kafka
        messages = consume_kafka_messages(topic, group_id, max_messages)
        new_orders=[]
        saved_orders = []
        errors = []
        
        for message in messages:
            try:
                # Parse each message
                order_data = json.loads(message)
                new_orders.append(order_data)

                # Fetch related Product and User instances
                product = Product.objects.get(id=order_data['product'])  # Assuming 'product' is the product ID
                user = User.objects.get(id=order_data['user'])  # Assuming 'user' is the user ID

                # Create an Order object
                order = Order.objects.create(
                    user=user,
                    product=product,
                    quantity=order_data['quantity'],
                    is_purchase=order_data['is_purchase'],
                )
                saved_orders.append(order.id)
            except Product.DoesNotExist:
                errors.append(f"Product with ID {order_data['product']} not found.")
            except User.DoesNotExist:
                errors.append(f"User with ID {order_data['user']} not found.")
            except Exception as e:
                errors.append(f"Error processing message: {message}, Error: {str(e)}")

        # Return a JSON response with saved order IDs and errors
        return JsonResponse({
            "status": "success",
            "New orders": new_orders,
            "Saved orders": saved_orders,
       
        }, status=200)

    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

@csrf_exempt
def consume_kafka_messages_view2(request, topic):
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

@csrf_exempt
def mapreduce_results_view(request):
    # Fetch MapReduce results
    results = fetch_mapreduce_results()

    # Return the results as JSON or render them in a template
    return JsonResponse({"results": results})





