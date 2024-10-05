import { createTokenCSRFbySessionId } from "../../auth/functions/auth.cstf";
import { LoginUser } from "../../auth/functions/auth.login";
// import { registerNewUser } from "auth/functions/auth.register";
import { Router } from "express";
import sqliteDB from "../../sqlite/db.sqlite";

export const StudentGroupRouter = Router();

StudentGroupRouter.post("/add-student-group", async (req, res) => {
    const stmt = sqliteDB.prepare(`
        INSERT INTO student_group (name) VALUES (?)
    `);

    const { name } = req.body;
    stmt.run(name);

    res.status(200).json({message: "Student group added successfully"});
    
});

StudentGroupRouter.post("/add-student-group", async (req, res) => {
    
    const { student_user_id, group_id } = req.body;

    const userStmt = sqliteDB.prepare(`
        SELECT COUNT(*) as count FROM user WHERE id = ?
    `);
    const groupStmt = sqliteDB.prepare(`
        SELECT COUNT(*) as count FROM student_group WHERE id = ?
    `);

    const userResult: any = userStmt.get(student_user_id);
    const groupResult: any = groupStmt.get(group_id);

    if (userResult.count === 0) {
        res.status(400).json({ message: "Invalid student_user_id" });
        return
    }

    if (groupResult.count === 0) {
        res.status(400).json({ message: "Invalid group_id" });
        return
    }

    const insertStmt = sqliteDB.prepare(`
        INSERT INTO student_group_assign (student_user_id, group_id) VALUES (?, ?)
    `);
    insertStmt.run(student_user_id, group_id);

    res.status(200).json({ message: "Student added to group successfully" });
    
});

StudentGroupRouter.get("/get-student-groups", async (req, res) => {
    const stmt = sqliteDB.prepare(`
        SELECT * FROM student_group
    `);

    const result = stmt.all();
    res.status(200).json(result);
});