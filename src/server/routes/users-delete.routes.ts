
import { Router } from "express";
import sqliteDB from "../../sqlite/db.sqlite";

export const UserDelRouter = Router();

UserDelRouter.post('/delete-user', async (req, res) => {
    const { username } = req.body;
    try {
        const stmt = sqliteDB.prepare(
            `DELETE FROM user WHERE username = ?`
    );
    stmt.run(username);
        res.status(201).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete' });
    }
});

UserDelRouter.post('/delete-student', async (req, res) => {
    const { sc_number } = req.body;
    try {
        const stmt = sqliteDB.prepare(
            `DELETE FROM user WHERE sc_number = ? AND role = 'student'`
    );
    stmt.run(sc_number);
        res.status(201).send({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete student' });
    }
});

