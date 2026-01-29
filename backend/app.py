from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timezone
from models import save_event, get_latest_events

app = Flask(__name__)
CORS(app)

# webhook endpoint to receive GitHub events
@app.route("/webhook", methods=["POST"])
def webhook():
    event = request.headers.get("X-GitHub-Event")
    payload = request.json

    if event == "push":
        handle_push(payload)
    elif event == "pull_request":
        handle_pull_request(payload)

    return jsonify({"status": "ok"}), 200

# function to handle push events
def handle_push(payload):
    save_event({
        "request_id": payload["after"],
        "author": payload["pusher"]["name"],
        "action": "PUSH",
        "from_branch": "",
        "to_branch": payload["ref"].replace("refs/heads/", ""),
        "timestamp": utc_now()
    })

# function to handle pull request events and merges
def handle_pull_request(payload):
    pr = payload["pull_request"]

    if payload["action"] == "opened":
        save_event({
            "request_id": str(pr["id"]),
            "author": pr["user"]["login"],
            "action": "PULL_REQUEST",
            "from_branch": pr["head"]["ref"],
            "to_branch": pr["base"]["ref"],
            "timestamp": utc_now()
        })

    if payload["action"] == "closed" and pr["merged"]:
        save_event({
            "request_id": pr["merge_commit_sha"],
            "author": pr["merged_by"]["login"],
            "action": "MERGE",
            "from_branch": pr["head"]["ref"],
            "to_branch": pr["base"]["ref"],
            "timestamp": utc_now()
        })

# endpoint to fetch latest events
@app.route("/events")
def events():
    return jsonify(get_latest_events())


# utility function to get current UTC time formatted
def utc_now():
    return datetime.now(timezone.utc).strftime("%d %B %Y - %I:%M %p UTC")

# run the Flask app
app.run(host="0.0.0.0", port=5000)
