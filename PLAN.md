# PLAN.md — Notes App

A simple notes app with add, view, edit, and delete. Built with Flask + PostgreSQL + vanilla JS over 7 days (~1 hr/day).

---

## Features

- Add a note (title + content)
- View all notes (newest first)
- Edit a note
- Delete a note

---

## Stack

- **Backend:** Flask, psycopg2
- **Database:** PostgreSQL
- **Frontend:** HTML, CSS, vanilla JS

---

## 7-Day Plan

| Day | Focus | Goal |
|-----|-------|------|
| 1 | Planning | Write PLAN.md, DESIGN.md, schema.sql, stub files |
| 2 | DB + server | Connect Postgres, run schema, boot Flask, test /health |
| 3 | GET + POST | List and create notes via API |
| 4 | PUT + DELETE | Edit and delete notes, full CRUD done |
| 5 | Frontend | HTML structure + CSS layout |
| 6 | JS wiring | Connect UI to all 4 API routes |
| 7 | Polish | Loading states, cleanup, write README |

---

## Done when

- All 4 features work in the browser
- Notes persist between server restarts
- README works from a fresh clone