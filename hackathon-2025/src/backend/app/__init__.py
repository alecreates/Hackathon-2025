from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS  # Import CORS
import os

def create_app():
    app = Flask(__name__)

    # Enable CORS for all routes
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # MongoDB URI
    app.config['MONGO_URI'] = os.getenv("MONGODB_URI", "mongodb+srv://sal77130:iWZBEkFgzIiFzLQN@musiccupid.6pcuf.mongodb.net/musiccupid")

    # Initialize MongoDB connection
    client = MongoClient(app.config['MONGO_URI'])
    app.db = client["music_db"]

    # Register the blueprint for routes
    from app.routes import main_routes
    app.register_blueprint(main_routes)

    return app
