import { Router } from "express";
import sqliteDB from "../../sqlite/db.sqlite";

export const SingleUserDetailsRouter = Router();


SingleUserDetailsRouter.post('/single-user', async (req, res) => {
    try {
        console.log("[+] single user details req.body: ", req.body);
        const { id } = req.body;
        const stmt = sqliteDB.prepare("SELECT id, name, email, phone, sc_number, role, isActive, created_at FROM user WHERE id = ?");
        const user = stmt.get(id);
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});