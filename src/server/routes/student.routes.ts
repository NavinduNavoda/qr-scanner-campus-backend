import { createTokenCSRFbySessionId } from "../../auth/functions/auth.cstf";
import { LoginUser } from "../../auth/functions/auth.login";
// import { registerNewUser } from "auth/functions/auth.register";
import { Router } from "express";
import sqliteDB from "../../sqlite/db.sqlite";

export const StudentRouter = Router();

StudentRouter.post("/get-name-by-scnumber", async (req, res) => {
    const stmt = sqliteDB.prepare('SELECT * FROM user WHERE sc_number = ?');
    const user: any = stmt.get(req.body.sc_number);
    if(!user){
        res.status(400).json({message: "User not found"});
        return;
    }
    res.status(200).json({name: user.name});
});

StudentRouter.post("/get-student-by-scnumber", async (req, res) => {
    const stmt = sqliteDB.prepare('SELECT * FROM user WHERE sc_number = ?');
    const user: any = stmt.get(req.body.sc_number);
    if(!user){
        res.status(400).json({message: "User not found"});
        return;
    }
    res.status(200).json(user);
});
