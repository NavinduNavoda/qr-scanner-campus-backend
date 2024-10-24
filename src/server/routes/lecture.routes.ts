
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
            insertAttendanceStmt.run(result.lastInsertRowid, student_group_id, student.student_user_id, 0);
        }

        res.status(201).json({ message: "Lecture added successfully", lecId: result.lastInsertRowid });



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


LectureRouter.post("/get-lectures-by-date", async (req, res) => {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        res.status(400).json({ error: "Start date and end date are required" });
        return;
    }

    try {
        const stmt = sqliteDB.prepare(
            `SELECT * FROM lecture WHERE date BETWEEN ? AND ?`
        );
        const result = stmt.all(startDate, endDate);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lectures" });
    }
});

LectureRouter.post("/get-lectures-by-course", async (req, res) => {
    const { course_id } = req.body;

    if (!course_id) {
        res.status(400).json({ error: "Course ID is required" });
        return;
    }

    try {
        const stmt = sqliteDB.prepare(
            `SELECT * FROM lecture WHERE course_id = ?`
        );
        const result = stmt.all(course_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lectures" });
    }
});

LectureRouter.post("/get-lectures-by-course-and-date", async (req, res) => {
    const { course_id, startDate, endDate } = req.body;

    if (!course_id || !startDate || !endDate) {
        res.status(400).json({ error: "Course ID, start date, and end date are required" });
        return;
    }

    try {
        const stmt = sqliteDB.prepare(
            `SELECT * FROM lecture WHERE course_id = ? AND date BETWEEN ? AND ?`
        );
        const result = stmt.all(course_id, startDate, endDate);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lectures" });
    }
});

LectureRouter.post("/get-lectures-by-date-and-start-time", async (req, res) => {
    const { date, startTime } = req.body;

    if (!date || !startTime) {
        res.status(400).json({ error: "Date and start time are required" });
        return;
    }

    try {
        const stmt = sqliteDB.prepare(
            `SELECT * FROM lecture WHERE date = ? AND 'from' >= ?`
        );
        const result = stmt.all(date, startTime);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lectures" });
    }
});

LectureRouter.post("/get-lectures-by-course-date-and-start-time", async (req, res) => {
    const { course_id, date, startTime } = req.body;

    if (!course_id || !date || !startTime) {
        res.status(400).json({ error: "Course ID, date, and start time are required" });
        return;
    }

    try {
        const stmt = sqliteDB.prepare(
            `SELECT * FROM lecture WHERE course_id = ? AND date = ? AND 'from' >= ?`
        );
        const result = stmt.all(course_id, date, startTime);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lectures" });
    }
});

LectureRouter.post("/mark-attendance", async (req, res) => {
    const {sc_number, lec_id} = req.body;

    if (!sc_number || !lec_id) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    try {
        const getStudentStmt = sqliteDB.prepare(
            `SELECT id FROM user WHERE sc_number = ?`
        );
        console.log("scnumType", typeof sc_number);
        console.log("lec_id", lec_id);
        const student: any = getStudentStmt.get(sc_number);

        if (!student) {
            res.status(400).json({ error: "Student not found" });
            return;
        }

        const checkAttendanceStmt = sqliteDB.prepare(
            `SELECT * FROM attendance WHERE lec_id = ? AND student_user_id = ?`
        );
        const attendance = checkAttendanceStmt.get(lec_id, student.id);

        if (!attendance) {
            res.status(400).json({ error: "Attendance record not found for this lecture and student" });
            return;
        }

        const markAttendanceStmt = sqliteDB.prepare(
            `UPDATE attendance SET attend = ? WHERE lec_id = ? AND student_user_id = ?`
        );
        markAttendanceStmt.run(1, lec_id, student.id);

        res.status(200).json({ message: "Attendance marked successfully" });

    } catch (error) {
        console.log("mark attendace error" , error);
        res.status(500).json({ error: "Failed to mark attendance" });
    }
});

LectureRouter.post("/get-attendance", async (req, res) => {
    try {
        const { lec_id } = req.body;

        if (!lec_id) {
            res.status(400).json({ error: "Lecture ID is required" });
            return;
        }

        const lecStmt = sqliteDB.prepare(
            `SELECT 
            lecture.id as lecture_id, 
            lecture.date, 
            lecture.'from', 
            lecture.'to', 
            course.course_unit_number, 
            course.course_unit_name, 
            user.name as lecturer_name, 
            student_group.name as student_group_name 
            FROM lecture 
            JOIN course ON lecture.course_id = course.id 
            JOIN user ON lecture.lecture_user_id = user.id 
            JOIN student_group ON lecture.student_group_id = student_group.id 
            WHERE lecture.id = ?`
        );
        const lecDetails = lecStmt.get(lec_id);


        const stmt = sqliteDB.prepare(
            `SELECT 
                attendance.*, 
                user.name as student_name, 
                user.sc_number 
            FROM attendance 
            JOIN user ON attendance.student_user_id = user.id 
            WHERE attendance.lec_id = ? AND attendance.attend = 1`
        );
        const attendanceDetails = stmt.all(lec_id);

        res.status(200).json({ lecDetails, attendanceDetails });
    } catch (error) {
        console.log("get attendance error", error);
        res.status(500).json({ error: "Failed to fetch attendance" });
    }
});

LectureRouter.post("/get-student-group-by-lecture", async (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ error: "Lecture ID is required" });
        return;
    }

    try {
        const stmt = sqliteDB.prepare(
            `SELECT student_group_id FROM lecture WHERE id = ?`
        );
        const result = stmt.get(id) as { student_group_id: number };

        if (!result) {
            res.status(404).json({ error: "Lecture not found" });
            return;
        }

        res.status(200).json({ student_group_id: result.student_group_id });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch student group ID" });
    }
});