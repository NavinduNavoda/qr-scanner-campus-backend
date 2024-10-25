import { createTokenCSRFbySessionId } from "../../auth/functions/auth.cstf";
import { LoginUser } from "../../auth/functions/auth.login";
// import { registerNewUser } from "auth/functions/auth.register";
import { Router } from "express";
import sqliteDB from "../../sqlite/db.sqlite";

export const CourseRouter = Router();

CourseRouter.post("/add-course", async (req, res) => {
    const stmt = sqliteDB.prepare(`
        INSERT INTO course (course_unit_number, course_unit_name) VALUES (?, ?)
    `);

    const { course_unit_number, course_unit_name } = req.body;
    const info = stmt.run(course_unit_number, course_unit_name);

    res.status(200).json({ message: "Course added successfully", courseId: info.lastInsertRowid });
});

CourseRouter.get("/get-courses", async (req, res) => {
    const stmt = sqliteDB.prepare(`
        SELECT * FROM course
    `);

    const result = stmt.all();
    res.status(200).json(result);
});

CourseRouter.get("/get-course/:id", async (req, res) => {
    const stmt = sqliteDB.prepare(`
        SELECT * FROM course WHERE id = ?
    `);

    const result = stmt.get(req.params.id);
    res.status(200).json(result);
});

CourseRouter.put("/update-course/:id", async (req, res) => {
    const stmt = sqliteDB.prepare(`
        UPDATE course SET course_unit_number = ?, course_unit_name = ? WHERE id = ?
    `);

    const { course_unit_number, course_unit_name } = req.body;
    const info = stmt.run(course_unit_number, course_unit_name, req.params.id);

    res.status(200).json({ message: "Course updated successfully" });
});

CourseRouter.delete("/delete-course/:courseId", async (req, res) => {
    const stmt = sqliteDB.prepare(`
        DELETE FROM course WHERE id = ?
    `);

    stmt.run(req.params.courseId);
    res.status(200).json({ message: "Course deleted successfully" });
});