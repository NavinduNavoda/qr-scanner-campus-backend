
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

UserDetailsRouter.post('/single-student', async (req, res) => {
    try {
        const { id } = req.body;
        const stmt = sqliteDB.prepare("SELECT id, name, email, phone, sc_number, role, isActive, created_at FROM user WHERE id = ? AND role = ?");
        const student = stmt.get(id, 'student');
        
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student' });
    }
});

UserDetailsRouter.post('/single-lecturer', async (req, res) => {
    try {
        const { id } = req.body;
        const stmt = sqliteDB.prepare("SELECT id, name, email, phone, sc_number, role, isActive, created_at FROM user WHERE id = ? AND role = ?");
        const lecturer = stmt.get(id, 'lecturer');
        
        if (lecturer) {
            res.json(lecturer);
        } else {
            res.status(404).json({ error: 'Lecturer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lecturer' });
    }
});

UserDetailsRouter.post('/single-demo', async (req, res) => {
    try {
        const { id } = req.body;
        const stmt = sqliteDB.prepare("SELECT id, name, email, phone, sc_number, role, isActive, created_at FROM user WHERE id = ? AND role = ?");
        const demo = stmt.get(id, 'demo');
        
        if (demo) {
            res.json(demo);
        } else {
            res.status(404).json({ error: 'Demo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch demo' });
    }
});

UserDetailsRouter.post('/single-user', async (req, res) => {
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