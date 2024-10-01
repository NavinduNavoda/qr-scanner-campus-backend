import sqliteDB from "../../sqlite/db.sqlite";
// import { nanoid } from "nanoid";
const { v4: uuidv4 } = require('uuid');

export const createTokenCSRFbyUsername = (username: string) => {
    const csrf_token = uuidv4();
    const stmt = sqliteDB.prepare('UPDATE user SET csrf_token = ? WHERE username = ?');
    stmt.run(csrf_token, username);
    return csrf_token;
}

export const createTokenCSRFbyId = (id: number | bigint) => {
    const csrf_token = uuidv4();
    const stmt = sqliteDB.prepare('UPDATE user SET csrf_token = ? WHERE id = ?');
    stmt.run(csrf_token, id);
    return csrf_token;
}

export const createTokenCSRFbySessionId = (session_id: string) => {
    const csrf_token = uuidv4();
    const stmt = sqliteDB.prepare('UPDATE user SET csrf_token = ? WHERE session_id = ?');
    stmt.run(csrf_token, session_id);
    return csrf_token;
}