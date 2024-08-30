from pymongo import MongoClient
import gridfs
import datetime

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['userAuthDB']
fs = gridfs.GridFS(db, collection='videos')

# Sample videos and metadata
videos = [
    {
        'filename': 'camera1.mp4',
        'metadata': {
            'detected_at': datetime.datetime.now(datetime.timezone.utc),
            'camera_id': 'Camera 1',
            'room': 'LRB 105',
            'activity': 'Unauthorized device detected'
        }
    },
    {
        'filename': 'camera2.mp4',
        'metadata': {
            'detected_at': datetime.datetime.now(datetime.timezone.utc),
            'camera_id': 'Camera 2',
            'room': 'LRB 106',
            'activity': 'Suspicious pose detected'
        }
    },
    {
        'filename': 'camera3.mp4',
        'metadata': {
            'detected_at': datetime.datetime.now(datetime.timezone.utc),
            'camera_id': 'Camera 3',
            'room': 'FL1',
            'activity': 'Student talking during exam'
        }
    }
]

# Store videos in GridFS
for video in videos:
    with open(video['filename'], 'rb') as f:
        video_id = fs.put(f, filename=video['filename'], metadata=video['metadata'])
        print(f"Video {video['filename']} stored with ID: {video_id}")

print("Videos inserted successfully.")
