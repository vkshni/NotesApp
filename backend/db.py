# DB

import sqlite3
from pathlib import Path
import sys

# Adding PROJECT ROOT to the Python Path
PROJECT_ROOT = Path(__file__).parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))


# Notes DB
class NotesDB:

    def __init__(self):
        self.db_path = PROJECT_ROOT / "backend" / "notes.db"
        self.db_path.parent.mkdir(exist_ok=True)

    def _get_connection(self):

        conn = sqlite3.connect(str(self.db_path))
        conn.row_factory = sqlite3.Row
        return conn

    def get_schema(self):
        schema_path = PROJECT_ROOT / "backend" / "schema.sql"
        with open(schema_path, "r") as f:
            schema = f.read()
        return schema

    def create_table(self):

        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()

                cursor.execute(self.get_schema())
            return True
        except Exception as e:
            return False

    def get_all(self):

        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM notes")
                results = cursor.fetchall()

            return results
        except:
            return []

    def add_note(self, note: dict):

        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO notes (title, content) VALUES (?,?)",
                    (note.get("title"), note.get("content")),
                )
                return cursor.lastrowid

        except:
            return False

    def delete_all(self):

        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM notes")
                conn.commit()
                return True

        except:
            return False

    def delete_note(self, note_id: int):

        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM notes WHERE id = ?", (note_id,))
                return cursor.rowcount > 0
        except:
            return False
