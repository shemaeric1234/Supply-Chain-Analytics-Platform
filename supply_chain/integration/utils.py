import csv
from django.core.management.base import BaseCommand
from users.models import  User
from orders.models import Order
from inventory.models import Product
import subprocess
import os

def export_inventory_to_csv(filepath):
    with open(filepath, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["id", "name", "quantity", "price"])
        for item in Product.objects.all():
            writer.writerow([item.id, item.name, item.quantity, item.price])

def export_order_to_csv(filepath):
    with open(filepath, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["id", "user_id", "inventory_id", "quantity", "order_date"])
        for order in Order.objects.all():
            writer.writerow([
                order.id,
                order.user.id,
                order.product.id,
                order.quantity,
                order.order_date
            ])

def export_user_to_csv(filepath):
    with open(filepath, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["id", "username", "email", "role"])
        for user in User.objects.all():
            writer.writerow([user.id, user.username, user.email, user.role])



def run_mapreduce():
    """
    Run the MapReduce job on the Hadoop cluster.
    This is just a placeholder; replace with actual job execution logic.
    """
    # Assuming you have a Hadoop command to run the MapReduce job
    hadoop_command = "hadoop jar /path/to/your/mapreduce-job.jar"
    subprocess.run(hadoop_command, shell=True, check=True)

def fetch_mapreduce_results():
    """
    Fetch results after the MapReduce job has run.
    This can include reading output files from HDFS.
    """
    hdfs_output_path = "/path/to/output/on/hdfs"
    # Logic to read the output from HDFS
    # Example: fetching results via HDFS command or API
    results = subprocess.check_output(f"hadoop fs -cat {hdfs_output_path}", shell=True)
    return results.decode("utf-8")