CREATE TABLE IF NOT EXISTS "course" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_unit_number TEXT,
  course_unit_name TEXT
);

CREATE TABLE IF NOT EXISTS "student_group" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

CREATE TABLE IF NOT EXISTS "student_group_assign" (
  student_user_id INTEGER,
  group_id INTEGER
);

CREATE TABLE IF NOT EXISTS "lecture" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER,
  lecture_user_id INTEGER,
  date DATE,
  "from" DATE,
  "to" DATE,
  student_group_id INTEGER
);

CREATE TABLE IF NOT EXISTS "attendance" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lec_id INTEGER,
  student_group_id INTEGER,
  student_user_id INTEGER,
  attend BOOLEAN,
  attend_time TEXT
);
