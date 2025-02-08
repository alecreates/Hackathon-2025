from flask import Blueprint, request, jsonify
from app.model import hybrid_model
from app.db import get_db_connection
from bson.objectid import ObjectId

routes_bp = Blueprint('routes', __name__)

@routes_bp.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    birthday = data.get("birthday")
    bio = data.get("bio")
    image = data.get("image")
    song1 = data.get("song1")
    song2 = data.get("song2")
    song3 = data.get("song3")
    song4 = data.get("song4")
    song5 = data.get("song5")

    # Hash the password (use bcrypt or similar)
    hashed_password = password  # Replace with actual hashing logic

    # Create and save the user
    db = get_db_connection()
    user_data = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "birthday": birthday,
        "bio": bio,
        "image": image,
        "song1": song1,
        "song2": song2,
        "song3": song3,
        "song4": song4,
        "song5": song5,
    }
    result = db.users.insert_one(user_data)
    user_id = str(result.inserted_id)

    return jsonify({"message": "User registered successfully.", "user_id": user_id})

@routes_bp.route('/api/search', methods=['POST'])
def search_songs():
    data = request.json
    query = data.get("query", "")

    db = get_db_connection()
    songs = list(db.songs.find({"track_name": {"$regex": query, "$options": "i"}}).limit(10))

    # Convert ObjectId to string for JSON serialization
    for song in songs:
        song["_id"] = str(song["_id"])

    return jsonify(songs)

@routes_bp.route('/api/compatibility', methods=['POST'])
def calculate_compatibility():
    data = request.json
    user1_id = data.get("user1_id")
    user2_id = data.get("user2_id")

    db = get_db_connection()
    user1 = db.users.find_one({"_id": ObjectId(user1_id)})
    user2 = db.users.find_one({"_id": ObjectId(user2_id)})

    if not user1 or not user2:
        return jsonify({"error": "One or both users not found."}), 404

    # Fetch songs for both users
    user1_songs = [
        db.songs.find_one({"track_id": user1["song1"]}),
        db.songs.find_one({"track_id": user1["song2"]}),
        db.songs.find_one({"track_id": user1["song3"]}),
        db.songs.find_one({"track_id": user1["song4"]}),
        db.songs.find_one({"track_id": user1["song5"]}),
    ]
    user2_songs = [
        db.songs.find_one({"track_id": user2["song1"]}),
        db.songs.find_one({"track_id": user2["song2"]}),
        db.songs.find_one({"track_id": user2["song3"]}),
        db.songs.find_one({"track_id": user2["song4"]}),
        db.songs.find_one({"track_id": user2["song5"]}),
    ]

    # Example genre and artist mappings (replace with your actual data)
    all_genres = {"pop": 0, "rock": 1, "acoustic": 2}
    all_artists = {"Ed Sheeran": 0, "Taylor Swift": 1}

    # Calculate compatibility score using the hybrid model
    total_score = 0
    for song1 in user1_songs:
        for song2 in user2_songs:
            if song1 and song2:
                score = hybrid_model(song1, song2, all_genres, all_artists)
                total_score += score

    # Average the scores
    compatibility_score = total_score / (len(user1_songs) * len(user2_songs))

    return jsonify({"compatibility_score": compatibility_score})