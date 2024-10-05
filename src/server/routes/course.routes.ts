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
    stmt.run(course_unit_number, course_unit_name);

    res.status(200).json({message: "Course added successfully"});
    
});

CourseRouter.get("/get-courses", async (req, res) => {
    const stmt = sqliteDB.prepare(`
        SELECT * FROM course
    `);

    const result = stmt.all();
    res.status(200).json(result);
});