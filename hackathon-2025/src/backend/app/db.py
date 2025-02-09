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

def get_song_data_by_name(track_name):
    db = get_db_connection()
    song = db.songs.find_one({"track_name": track_name})  # Query by track_name
    return song

def get_all_genres():
    db = get_db_connection()
    genres = db.songs.distinct("genre")  # Get unique genres from MongoDB
    all_genres = {genre: index for index, genre in enumerate(genres)}  # Convert to dictionary with index as value
    return all_genres

def get_all_artists():
    db = get_db_connection()
    artists = db.songs.distinct("artist_name")  # Get unique artists from MongoDB
    all_artists = {artist: index for index, artist in enumerate(artists)}  # Convert to dictionary with index as value
    return all_artists