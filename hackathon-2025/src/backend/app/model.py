# app/model.py
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler

# Function to encode genre and artist into one-hot vectors
def encode_genre_and_artist(genre, artist, all_genres, all_artists):
    genre_encoded = np.zeros(len(all_genres))
    artist_encoded = np.zeros(len(all_artists))

    genre_index = all_genres.get(genre, None)
    artist_index = all_artists.get(artist, None)

    if genre_index is not None:
        genre_encoded[genre_index] = 1
    if artist_index is not None:
        artist_encoded[artist_index] = 1

    return np.concatenate([genre_encoded, artist_encoded])

# Function to calculate content-based similarity between two songs
def calculate_content_similarity(song1, song2, all_genres, all_artists, genre_weight=0.7, features_weight=0.3):
    genre_artist1 = encode_genre_and_artist(song1["genre"], song1["artist_name"], all_genres, all_artists)
    genre_artist2 = encode_genre_and_artist(song2["genre"], song2["artist_name"], all_genres, all_artists)

    features1 = np.array([song1["tempo"], song1["energy"], song1["valence"], song1["danceability"], song1["acousticness"], song1["liveness"]])
    features2 = np.array([song2["tempo"], song2["energy"], song2["valence"], song2["danceability"], song2["acousticness"], song2["liveness"]])

    scaler = StandardScaler()
    features1 = scaler.fit_transform(features1.reshape(1, -1)).flatten()
    features2 = scaler.transform(features2.reshape(1, -1)).flatten()

    genre_artist_similarity = cosine_similarity([genre_artist1], [genre_artist2])[0][0]
    features_similarity = cosine_similarity([features1], [features2])[0][0]

    genre_artist_similarity = (genre_artist_similarity + 1) / 2
    features_similarity = (features_similarity + 1) / 2

    weighted_similarity = (genre_weight * genre_artist_similarity) + (features_weight * features_similarity)

    return weighted_similarity * 100  # Return compatibility as percentage

# Hybrid model combining content-based and collaborative filtering scores
def hybrid_model(song1, song2, all_genres, all_artists, content_weight=0.5, collaborative_weight=0.5):
    content_score = calculate_content_similarity(song1, song2, all_genres, all_artists)
    collaborative_score = content_score  # For this model, we reuse the content score for collaborative filtering
    compatibility_score = (content_weight * content_score) + (collaborative_weight * collaborative_score)
    return compatibility_score
