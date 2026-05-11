# Main Backend

from flask import Flask, jsonify, request
from flask_cors import CORS
from pathlib import Path
import sys
import os

# Adding PROJECT ROOT to the Python Path
PROJECT_ROOT = Path(__file__).parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# Import DB
from db import NotesDB

app = Flask(__name__)
CORS(app)
notes_db = NotesDB()

# Creating table
notes_db.create_table()


# GET all Notes
@app.route("/notes", methods=["GET"])
def get_notes():
    notes = notes_db.get_all()
    return jsonify([dict(note) for note in notes]), 200


# POST a new note
@app.route("/notes", methods=["POST"])
def add_note():
    data = request.get_json()

    if not data or not data.get("title") or not data.get("content"):
        return jsonify({"error": "Title and content are required"}), 400

    title = data.get("title").strip()
    content = data.get("content").strip()

    if not title or not content:
        return jsonify({"error": "Title and content cannot be empty"}), 400

    try:
        note_id = notes_db.add_note({"title": title, "content": content})
        return jsonify({"id": note_id, "message": "Note created"}), 201
    except Exception as e:
        return jsonify({"error": "Failed to create note"}), 500


# DELETE single note - /notes/1
@app.route("/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    deleted = notes_db.delete_note(note_id)
    if not deleted:
        return jsonify({"error": "Note not found"}), 404
    return "", 204


# DELETE all notes - /notes/clear
@app.route("/notes/clear", methods=["DELETE"])
def clear_all():
    notes_db.delete_all()
    return jsonify({"message": "All notes deleted"}), 200


# UPDATE note - /notes/1
@app.route("/notes/<int:note_id>", methods=["PUT"])
def update_note(note_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "No parameters were given"}), 400

    try:
        updated = notes_db.update_note(
            note_id=note_id,
            new_title=data.get("title"),
            new_content=data.get("content"),
        )
        if not updated:
            return jsonify({"error": "Note not found"}), 404
        return jsonify({"message": "Note updated"}), 200
    except:
        return jsonify({"error": "Failed to update note"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
