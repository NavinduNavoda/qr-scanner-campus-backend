PRAGMA foreign_keys = ON;


CREATE TABLE IF NOT EXISTS "user" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "username" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "session_id" TEXT,
  "csrf_token" TEXT,

  "name" TEXT NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "phone" TEXT UNIQUE NOT NULL,
  "sc_number" TEXT,
  "role" TEXT NOT NULL DEFAULT 'student', -- student, demo, lecturer


  "isActive" INTEGER NOT NULL DEFAULT 1,
  "created_at" TEXT NOT NULL DEFAULT (datetime('now'))
);