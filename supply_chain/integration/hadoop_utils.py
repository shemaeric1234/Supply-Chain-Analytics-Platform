from hdfs import InsecureClient
import requests

def get_hdfs_client():
    hadoop_host = 'http://localhost:9870/'  # Adjust for your setup
    client = InsecureClient(hadoop_host, user='hadoop')
    return client

def upload_file_to_hdfs(local_path, hdfs_path):
    webhdfs_url = f"http://localhost:9870/webhdfs/v1{hdfs_path}"
    print("Uploading to:", webhdfs_url)

    with open(local_path, 'rb') as file_data:
        response = requests.put(
            webhdfs_url,
            params={
                "op": "CREATE",
                "user.name": "hadoop",
                "namenoderpcaddress": "namenode:9000",
                "createparent": "true",
                "overwrite": "true",
            },
            data=file_data,
        )
    if response.status_code == 201:
        print("Upload successful.")
    else:
        print("Upload failed:", response.content)

def read_file_from_hdfs(hdfs_path):
    client = get_hdfs_client()
    with client.read(hdfs_path) as reader:
        return reader.read()
