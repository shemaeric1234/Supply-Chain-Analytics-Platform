from hdfs import InsecureClient

def get_hdfs_client():
    hadoop_host = 'http://localhost:9870/'  # Adjust for your setup
    client = InsecureClient(hadoop_host, user='hadoop')
    return client

def upload_file_to_hdfs(local_path, hdfs_path):
    client = get_hdfs_client()
    with open(local_path, 'rb') as file_data:
        client.write(hdfs_path, file_data, overwrite=True)

def read_file_from_hdfs(hdfs_path):
    client = get_hdfs_client()
    with client.read(hdfs_path) as reader:
        return reader.read()
