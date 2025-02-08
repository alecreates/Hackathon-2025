from flask import Flask
from pymongo import MongoClient
import os

def create_app():
    app = Flask(__name__)

    # MongoDB URI
    app.config['MONGO_URI'] = os.getenv("MONGODB_URI", "mongodb+srv://sal77130:iWZBEkFgzIiFzLQN@musiccupid.6pcuf.mongodb.net/musiccupid")

    # Initialize MongoDB connection
    client = MongoClient(app.config['MONGO_URI'])
    app.db = client["music_db"]

    # Register the blueprint for routes
    from app.routes import main_routes
    app.register_blueprint(main_routes)

    return app