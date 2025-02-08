from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb+srv://sal77130:iWZBEkFgzIiFzLQN@musiccupid.6pcuf.mongodb.net/musiccupid")
db = client["music_db"]
collection = db["songs"]  

# Fetch song data
songs = list(collection.find())
print(songs[:2])
