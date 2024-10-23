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
    const result = stmt.run(name);

    res.status(200).json({ message: "Student group added successfully", group_id: result.lastInsertRowid });
});


StudentGroupRouter.post("/add-student-to-group", async (req, res) => {
    
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


    const assignCheckStmt = sqliteDB.prepare(`
        SELECT COUNT(*) as count FROM student_group_assign WHERE student_user_id = ? AND group_id = ?
    `);
    const assignCheckResult: any = assignCheckStmt.get(student_user_id, group_id);

    if (assignCheckResult.count > 0) {
        res.status(400).json({ message: "Student already assigned to the relevant group" });
        return;
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

StudentGroupRouter.post("/delete-student-group", async (req, res) => {
    const { group_id } = req.body;

    const groupStmt = sqliteDB.prepare(`
        SELECT COUNT(*) as count FROM student_group WHERE id = ?
    `);

    const groupResult: any = groupStmt.get(group_id);

    if (groupResult.count === 0) {
        res.status(400).json({ message: "Invalid group_id" });
        return;
    }

    const deleteAssignStmt = sqliteDB.prepare(`
        DELETE FROM student_group_assign WHERE group_id = ?
    `);
    deleteAssignStmt.run(group_id);

    const deleteGroupStmt = sqliteDB.prepare(`
        DELETE FROM student_group WHERE id = ?
    `);
    deleteGroupStmt.run(group_id);

    res.status(200).json({ message: "Student group deleted successfully" });
});


StudentGroupRouter.post("/modify-student-group", async (req, res) => {
    const { group_id, new_name } = req.body;

    const groupStmt = sqliteDB.prepare(`
        SELECT COUNT(*) as count FROM student_group WHERE id = ?
    `);

    const groupResult: any = groupStmt.get(group_id);

    if (groupResult.count === 0) {
        res.status(400).json({ message: "Invalid group_id" });
        return;
    }

    const updateStmt = sqliteDB.prepare(`
        UPDATE student_group SET name = ? WHERE id = ?
    `);
    updateStmt.run(new_name, group_id);

    res.status(200).json({ message: "Student group name updated successfully" });
});

StudentGroupRouter.post("/get-group-name", async (req, res) => {
    const { id } = req.body;

    const stmt = sqliteDB.prepare(`
        SELECT name FROM student_group WHERE id = ?
    `);

    const result = stmt.get(id);

    if (!result) {
        res.status(404).json({ message: "Group not found" });
        return;
    }

    res.status(200).json(result);
});