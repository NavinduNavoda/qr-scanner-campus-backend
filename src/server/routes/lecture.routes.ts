
import { Router } from "express";
import sqliteDB from "../../sqlite/db.sqlite";

export const LectureRouter = Router();

LectureRouter.post("/add-lecture", async (req, res) => {
    const { course_id, lecture_user_id, date, from, to, student_group_id } = req.body;

    console.log("lec create body", req.body);

    if (!course_id || !lecture_user_id || !date || !from || !to || !student_group_id) {
        const missingFields = [];
        if (!course_id) missingFields.push("course_id");
        if (!lecture_user_id) missingFields.push("lecture_user_id");
        if (!date) missingFields.push("date");
        if (!from) missingFields.push("from");
        if (!to) missingFields.push("to");
        if (!student_group_id) missingFields.push("student_group_id");

        res.status(400).json({ error: "All fields are required", missingFields });
        // res.status(400).json({ error: "All fields are required" });
        return;
    }

    try {
        const stmt = sqliteDB.prepare(
            `INSERT INTO lecture (course_id, lecture_user_id, date, 'from', 'to', student_group_id) VALUES (?, ?, ?, ?, ?, ?)`
        );
        const result: any = stmt.run(
            course_id, lecture_user_id, date, from, to, student_group_id
        );
        
        const getAllStudentsInGroupStmt = sqliteDB.prepare(
            `SELECT student_user_id FROM student_group_assign WHERE group_id = ?`
        );

        const students: any = getAllStudentsInGroupStmt.all(student_group_id);

        const insertAttendanceStmt = sqliteDB.prepare(
            `INSERT INTO attendance (lec_id, student_group_id, student_user_id, attend) VALUES (?, ?, ?, ?)`
        );

        for (const student of students) {
            insertAttendanceStmt.run(result.lastInsertRowid, student_group_id, student.student_user_id, false);
        }

        res.status(201).json({ message: "Lecture added successfully" });



    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add lecture" });
    }
    
});

LectureRouter.get("/get-lectures", async (req, res) => {
    try {
        const stmt = sqliteDB.prepare(
            `SELECT * FROM lecture`
        );
        const result = stmt.all();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lectures" });
    }
});

LectureRouter.post("/mark-attendance", async (req, res) => {
    const {sc_number} = req.body;
    const {lec_id} = req.body;

    if (!sc_number || !lec_id) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    try {
        const getStudentStmt = sqliteDB.prepare(
            `SELECT id FROM user WHERE sc_number = ?`
        );
        const student: any = getStudentStmt.get(sc_number);

        if (!student) {
            res.status(400).json({ error: "Student not found" });
            return;
        }

        const markAttendanceStmt = sqliteDB.prepare(
            `UPDATE attendance SET attend = ? WHERE lec_id = ? AND student_user_id = ?`
        );
        markAttendanceStmt.run(true, lec_id, student.id);

        res.status(200).json({ message: "Attendance marked successfully" });

    } catch (error) {
        res.status(500).json({ error: "Failed to mark attendance" });
    }
});

LectureRouter.get("/get-attendance", async (req, res) => {
    try {
        const { lec_id } = req.body;

        if (!lec_id) {
            res.status(400).json({ error: "Lecture ID is required" });
            return;
        }

        const stmt = sqliteDB.prepare(
            `SELECT * FROM attendance WHERE lec_id = ?`
        );
        const result = stmt.all(lec_id);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch attendance" });
    }
});