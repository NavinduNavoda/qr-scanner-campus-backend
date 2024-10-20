
import { Router } from "express";
import sqliteDB from "../../sqlite/db.sqlite";
import { bhash } from "../../auth/util/hash";

export const UserAddRouter = Router();

UserAddRouter.post('/add-demo', async (req, res) => {
    const { username, password, name, email, phone } = req.body;
    try {
        const stmt = sqliteDB.prepare(
            `INSERT INTO user (username, password, session_id, csrf_token, name, email, phone, role) VALUES (?, ?, NULL, NULL, ?, ?, ?, 'demo')`
    );
    stmt.run([username,  await bhash(password), name, email, phone]);
    res.status(201).send({ message: 'Demo added successfully' });
    } catch (error) {
    res.status(500).send({ error: 'Failed to add demo' });
    }
});

UserAddRouter.post('/add-student', async (req, res) => {
    const { username, password, name, email, phone, sc_number } = req.body;
    try {
    const stmt = sqliteDB.prepare(
        `INSERT INTO user (username, password, session_id, csrf_token, name, email, phone, sc_number, role) VALUES (?, ?, NULL, NULL, ?, ?, ?, ?, 'student')`
    );
    stmt.run([username, await bhash(password), name, email, phone, sc_number]);
    res.status(201).send({ message: 'Student added successfully' });
    } catch (error) {
    res.status(500).send({ error: 'Failed to add student' });
    }
});

UserAddRouter.post('/add-lecturer', async (req, res) => {
    const { username, password, name, email, phone } = req.body;
    try {
    const stmt = sqliteDB.prepare(
        `INSERT INTO user (username, password, session_id, csrf_token, name, email, phone, role) VALUES (?, ?, NULL, NULL, ?, ?, ?, 'lecturer')`
    );
    stmt.run([username, await bhash(password), name, email, phone]);
    res.status(201).send({ message: 'Lecturer added successfully' });
    } catch (error) {
    res.status(500).send({ error: 'Failed to add lecturer' });
    }
});
