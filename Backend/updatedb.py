from pymongo import MongoClient
import bcrypt

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['userAuthDB']
user_collection = db['users']

# Sample test data
users = [
    {
        'username': 'Harris Nkindwa',
        'password': bcrypt.hashpw('staff'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
        'role': 'staff'
    },

]

# Insert data into the collection
user_collection.insert_many(users)

print("Test data inserted successfully.")
