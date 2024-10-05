
import { Router } from "express";
import sqliteDB from "../../sqlite/db.sqlite";

export const UserDetailsRouter = Router();

UserDetailsRouter.get('/students', async (req, res) => {
    try {
        const stmt =  sqliteDB.prepare("SELECT id, name, email, phone, sc_number, role, isActive, created_at FROM user WHERE role = ?");
        const students =  stmt.all('student');
        
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

UserDetailsRouter.get('/demos', async (req, res) => {
    try {
        const stmt =  sqliteDB.prepare("SELECT id, name, email, phone, sc_number, role, isActive, created_at FROM user WHERE role = ?");
        const demos =  stmt.all('demo');
        
        res.json(demos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch demos' });
    }
});

UserDetailsRouter.get('/lecturers', async (req, res) => {
    try {
        const stmt =  sqliteDB.prepare("SELECT id, name, email, phone, sc_number, role, isActive, created_at FROM user WHERE role = ?");
        const lecturers =  stmt.all('lecturer');
        
        res.json(lecturers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lecturers' });
    }
});