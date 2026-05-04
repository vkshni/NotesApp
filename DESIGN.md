# DESIGN DOCUMENT

## Overview

A lightweight full-stack notes app built with Flask (backend), SQLite (database), and vanilla JS (frontend). No frameworks. The goal is a working, shippable app in 7 days at ~1 hour of work per day.

---

## Features

| Feature | Description | Done when... |
|---|---|---|
| Add note | Create a note with a title and content | POST /notes inserts a row and the card appears in the UI |
| Show notes | List all notes, newest first | GET /notes returns all rows; UI renders them on load |
| Edit note | Update the title or content of an existing note | PUT /notes/:id updates the row; UI reflects changes without reload |
| Delete note | Remove a note permanently | DELETE /notes/:id removes the row; card disappears from UI |

---

## Tech Stack

- **Backend:** Python 3, Flask
- **Database:** SQLite
- **Frontend:** HTML, CSS, vanilla JavaScript (fetch API)
- **Config:** `.env` file for DB connection string

---

## Directory Structure

```
notes-app/
├── backend/
│   ├── app.py          # Flask routes and app entry point
│   ├── db.py           # SQLite
│   └── schema.sql      # CREATE TABLE statement
├── frontend/
│   ├── index.html      # App shell and note form
│   ├── style.css       # All styles
│   └── app.js          # Fetch calls and DOM updates
├── .env                # DB_URL (not committed)
├── .env.example        # Template (committed)
├── PLAN.md             # This file
├── DESIGN.md           # API routes and DB schema detail
└── README.md           # Setup instructions
```

---

## API Contract (summary)

| Method | Route | Purpose |
|---|---|---|
| GET | /notes | Return all notes as JSON array |
| POST | /notes | Create a new note |
| PUT | /notes/:id | Update an existing note |
| DELETE | /notes/:id | Delete a note |
| GET | /health | Server health check |

Full request/response shapes are documented in `DESIGN.md`.

---

## Database Schema (summary)

Table: `notes`

| Column | Type | Notes |
|---|---|---|
| id | PRIMARY KEY | Auto-increment |
| title | TEXT NOT NULL | Required, non-empty |
| content | TEXT | Optional |
| created_at | TIMESTAMP | Set on insert |
| updated_at | TIMESTAMP | Updated on edit |

Full DDL is in `schema.sql`.

---

## API Routes

### GET /notes
Returns all notes, newest first.

```json
[
  { "id": 1, "title": "My note", "content": "Hello", "created_at": "..." }
]
```

### POST /notes
Create a new note.

Request:
```json
{ "title": "My note", "content": "Hello" }
```
Response: created note object, `201`.  
Error: `400` if title is missing.

### PUT /notes/:id
Update an existing note.

Request:
```json
{ "title": "Updated", "content": "New content" }
```
Response: updated note object.  
Error: `404` if not found.

### DELETE /notes/:id
Delete a note.

Response: `204` on success.  
Error: `404` if not found.

### GET /health
```json
{ "status": "ok" }
```

---

## Frontend Flow

1. Page loads → fetch `GET /notes` → render cards
2. Form submit → `POST /notes` → prepend new card
3. Edit button → turn card into form → `PUT /notes/:id` → re-render card
4. Delete button → `DELETE /notes/:id` → remove card from DOM