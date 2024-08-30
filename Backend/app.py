from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

# MongoDB setup
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['userAuthDB']
    user_collection = db['users']
    print("Connected to MongoDB successfully")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    exit(1)  # Exit the application if the connection fails

# Login route
@app.route('/survnet-new/Login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        print(f"Received login request: username={username}")

        if not username or not password:
            return jsonify({"message": "Username and password are required"}), 400

        user = user_collection.find_one({"username": username})
        
        if user:
            print("User found in the database")
            if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
                print("Password match successful")
                # Respond with user details upon successful login
                user_data = {
                    "username": user['username'],
                    "role": user.get('role', 'user')  # Assuming role is stored in the user document
                }
                return jsonify({"message": "Login successful", "user": user_data}), 200
            else:
                print("Password match failed")
                return jsonify({"message": "Invalid credentials"}), 401
        else:
            print("User not found")
            return jsonify({"message": "Invalid credentials"}), 401
    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

# Profile route
@app.route('/survnet-new/profile/<username>', methods=['GET'])
def get_profile(username):
    try:
        user = user_collection.find_one({"username": username}, {"_id": 0, "password": 0})
        if user:
            return jsonify({"user": user}), 200
        else:
            return jsonify({"message": f"User '{username}' not found"}), 404
    except Exception as e:
        print(f"Error fetching user profile: {e}")
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

# Update profile route
@app.route('/survnet-new/profile/<username>', methods=['PUT'])
def update_profile(username):
    try:
        data = request.json
        new_username = data.get('username')
        new_password = data.get('newPassword')

        if not new_username:
            return jsonify({"message": "Username is required"}), 400

        update_fields = {"username": new_username}
        
        if new_password:
            hashed_pw = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            update_fields["password"] = hashed_pw.decode('utf-8')

        result = user_collection.update_one({"username": username}, {"$set": update_fields})

        if result.modified_count > 0:
            return jsonify({"message": "Profile updated successfully"}), 200
        else:
            return jsonify({"message": "No changes made"}), 304
    except Exception as e:
        print(f"Error updating user profile: {e}")
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

# Fetch all users route
@app.route('/survnet-new/users', methods=['GET'])
def get_users():
    try:
        users = list(user_collection.find({}, {"_id": 1, "username": 1, "role": 1}))
        return jsonify({"users": users}), 200
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

# Create new user route
@app.route('/survnet-new/users', methods=['POST'])
def create_user():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"message": "Username and password are required"}), 400

        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        new_user = {
            "username": username,
            "password": hashed_pw,
            "role": "staff"  # Default role, adjust if needed
        }

        user_collection.insert_one(new_user)
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        print(f"Error creating user: {e}")
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
