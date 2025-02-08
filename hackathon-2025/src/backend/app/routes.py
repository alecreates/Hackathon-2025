from flask import Blueprint, request, jsonify
from app.db import get_song_data
from app.model import hybrid_model
from pymongo import MongoClient
import os

# Create a Blueprint for routes
main_routes = Blueprint('main_routes', __name__)

# MongoDB connection
def get_db_connection():
    MONGODB_URI = os.getenv("MONGODB_URI", "mongodb+srv://sal77130:iWZBEkFgzIiFzLQN@musiccupid.6pcuf.mongodb.net/musiccupid")
    client = MongoClient(MONGODB_URI)
    db = client["music_db"]
    return db

# Route to calculate compatibility score between two songs
@main_routes.route('/api/get_compatibility', methods=['POST'])
def get_compatibility():
    try:
        # Ensure request is JSON
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        # Extract song names from request body
        data = request.get_json()
        song1_name = data.get("song1_name")
        song2_name = data.get("song2_name")

        if not song1_name or not song2_name:
            return jsonify({"error": "Missing song1_name or song2_name"}), 400

        # Fetch track_ids for the given song names
        song1 = get_song_data_by_name(song1_name)
        song2 = get_song_data_by_name(song2_name)

        # If one or both songs are not found
        if not song1:
            return jsonify({"error": f"Song '{song1_name}' not found in the database"}), 404
        if not song2:
            return jsonify({"error": f"Song '{song2_name}' not found in the database"}), 404

        # Fetch all genres and artists from the database
        all_genres = get_all_genres()
        all_artists = get_all_artists()

        # Calculate compatibility score using the hybrid model, passing all_genres and all_artists
        score = hybrid_model(song1, song2, all_genres, all_artists)
        return jsonify({"compatibility_score": score}), 200

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

# Helper function to get song data by track_name
def get_song_data_by_name(track_name):
    db = get_db_connection()
    song = db.songs.find_one({"track_name": track_name})  # Query by track_name
    return song

# Helper function to fetch all genres from the database
def get_all_genres():
    db = get_db_connection()
    genres = db.songs.distinct("genre")  # Get unique genres from MongoDB
    all_genres = {genre: index for index, genre in enumerate(genres)}  # Convert to dictionary with index as value
    return all_genres

# Helper function to fetch all artists from the database
def get_all_artists():
    db = get_db_connection()
    artists = db.songs.distinct("artist_name")  # Get unique artists from MongoDB
    all_artists = {artist: index for index, artist in enumerate(artists)}  # Convert to dictionary with index as value
    return all_artists
