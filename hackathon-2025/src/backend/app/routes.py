from flask import Blueprint, request, jsonify
from app.db import get_song_data_by_name, get_all_genres, get_all_artists
from app.model import hybrid_model

# Create a Blueprint for routes
main_routes = Blueprint('main_routes', __name__)

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