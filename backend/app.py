# Main Backend

from flask import Flask, jsonify, request
from pathlib import Path
import sys

# Adding PROJECT ROOT to the Python Path
PROJECT_ROOT = Path(__file__).parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# Import DB
from backend.db import NotesDB

app = Flask(__name__)
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
    if not data or not data.get("title"):
        return jsonify({"error": "Title is required"}), 400

    note_id = notes_db.add_note(data)
    return jsonify({"id": note_id, "message": "Note created"}), 201


if __name__ == "__main__":
    app.run(debug=True)
