from django.http import JsonResponse
from integration.hadoop_utils import upload_file_to_hdfs
from integration.utils import export_inventory_to_csv, export_order_to_csv, export_user_to_csv

def export_data_to_hdfs(request):
    inventory_path = "inventory.csv"
    order_path = "orders.csv"
    user_path = "users.csv"

    export_inventory_to_csv(inventory_path)
    export_order_to_csv(order_path)
    export_user_to_csv(user_path)

    try:
        upload_file_to_hdfs(inventory_path, "/user/hadoop/inventory.csv")
        upload_file_to_hdfs(order_path, "/user/hadoop/orders.csv")
        upload_file_to_hdfs(user_path, "/user/hadoop/users.csv")
        return JsonResponse({"message": "Data exported to HDFS successfully!"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
