from pymongo import MongoClient
import os

def get_db_connection():
    MONGODB_URI = os.getenv("MONGODB_URI", "mongodb+srv://sal77130:iWZBEkFgzIiFzLQN@musiccupid.6pcuf.mongodb.net/musiccupid")
    client = MongoClient(MONGODB_URI)
    db = client["music_db"]
    return db

def get_song_data(track_id):
    db = get_db_connection()
    song = db.songs.find_one({"track_id": track_id})
    return song