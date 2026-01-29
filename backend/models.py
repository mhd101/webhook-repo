from pymongo import MongoClient
from config import MONGO_URI, DB_NAME, COLLECTION_NAME

# Create a MongoDB client using the connection URI
client = MongoClient(MONGO_URI)

# Select the database
db = client[DB_NAME]

# Select the collection within the database
collection = db[COLLECTION_NAME]

def save_event(data):
    """
    Save a single event document to MongoDB.
    `data` should be a dictionary.
    """
    collection.insert_one(data)

def get_latest_events(limit=20):
    """
    Fetch the latest events sorted by timestamp (descending).
    Excludes MongoDB's default _id field from results.
    """
    return list(
        collection.find({}, {"_id": 0})  # Exclude _id field
        .sort("timestamp", -1)           # Sort by newest first
        .limit(limit)                    # Limit number of results
    )
