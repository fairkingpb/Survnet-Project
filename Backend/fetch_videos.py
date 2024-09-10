from flask import Flask, request, send_file, Response
from pymongo import MongoClient
import gridfs
import io

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['userAuthDB']
fs = gridfs.GridFS(db, collection='videos')

# Route to fetch and stream a video by its filename
@app.route('/video/<filename>', methods=['GET'])
def get_video(filename):
    try:
        # Fetch video from GridFS
        video_file = fs.find_one({'filename': filename})
        if not video_file:
            return "Video not found", 404

        # Stream video file as response
        return Response(video_file.read(), mimetype="video/mp4")
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
