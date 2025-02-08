from flask import Blueprint, request, jsonify
from app.db import get_song_data
from app.model import hybrid_model
# Create a Blueprint for routes
main_routes = Blueprint('main_routes', __name__)
@main_routes.route('/')
def home():
    return "Welcome to the Song Compatibility App!"
@main_routes.route('/api/get_compatibility', methods=['POST'])
def get_compatibility():
    try:
        # Ensure request is JSON
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        # Extract song IDs from request body
        data = request.get_json()
        song1_id = data.get("song1_id")
        song2_id = data.get("song2_id")
        if not song1_id or not song2_id:
            return jsonify({"error": "Missing song1_id or song2_id"}), 400
        # Fetch songs from MongoDB
        song1 = get_song_data(song1_id)
        song2 = get_song_data(song2_id)
        if song1 and song2:
            # Calculate compatibility score using the hybrid model
            score = hybrid_model(song1, song2, all_genres, all_artists)
            return jsonify({"compatibility_score": score}), 200
        else:
            return jsonify({"error": "One or both songs not found"}), 404
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500