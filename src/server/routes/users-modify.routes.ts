
import { Router } from "express";
import sqliteDB from "../../sqlite/db.sqlite";
import { bhash } from "../../auth/util/hash";

export const UserModifyRouter = Router();

UserModifyRouter.put('/update-demo/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, name, email, phone } = req.body;
    try {
        const stmt = sqliteDB.prepare(
            `UPDATE user SET username = ?, password = ?, name = ?, email = ?, phone = ? WHERE id = ? AND role = 'demo'`
        );
        stmt.run([username, await bhash(password), name, email, phone, id]);
        res.status(200).send({ message: 'Demo updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to update demo' });
    }
});

UserModifyRouter.put('/update-student/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, name, email, phone, sc_number } = req.body;
    try {
        const stmt = sqliteDB.prepare(
            `UPDATE user SET username = ?, password = ?, name = ?, email = ?, phone = ?, sc_number = ? WHERE id = ? AND role = 'student'`
        );
        stmt.run([username, await bhash(password), name, email, phone, sc_number, id]);
        res.status(200).send({ message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to update student' });
    }
});

UserModifyRouter.put('/update-lecturer/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, name, email, phone } = req.body;
    try {
        const stmt = sqliteDB.prepare(
            `UPDATE user SET username = ?, password = ?, name = ?, email = ?, phone = ? WHERE id = ? AND role = 'lecturer'`
        );
        stmt.run([username, await bhash(password), name, email, phone, id]);
        res.status(200).send({ message: 'Lecturer updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to update lecturer' });
    }
});
