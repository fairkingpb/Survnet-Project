from pymongo import MongoClient
import gridfs

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['userAuthDB']
fs = gridfs.GridFS(db, collection='videos')  # Specify the collection name for GridFS

# Define the video filenames to retrieve
video_filenames = ['camera1.mp4', 'camera2.mp4', 'camera3.mp4']

for filename in video_filenames:
    # Retrieve the video file from GridFS
    file = fs.find_one({'filename': filename})
    
    if file:
        # Open a file in write-binary mode to save the video
        with open(f'retrieved_{filename}', 'wb') as output_file:
            output_file.write(file.read())
        print(f'Video {filename} retrieved and saved as retrieved_{filename}')
    else:
        print(f'Video {filename} not found in GridFS')
