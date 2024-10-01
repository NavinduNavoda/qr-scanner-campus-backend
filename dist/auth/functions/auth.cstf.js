import sqliteDB from "../../sqlite/db.sqlite";
import { nanoid } from "nanoid";
export const createTokenCSRFbyUsername = (username) => {
    const csrf_token = nanoid();
    const stmt = sqliteDB.prepare('UPDATE user SET csrf_token = ? WHERE username = ?');
    stmt.run(csrf_token, username);
    return csrf_token;
};
export const createTokenCSRFbyId = (id) => {
    const csrf_token = nanoid();
    const stmt = sqliteDB.prepare('UPDATE user SET csrf_token = ? WHERE id = ?');
    stmt.run(csrf_token, id);
    return csrf_token;
};
export const createTokenCSRFbySessionId = (session_id) => {
    const csrf_token = nanoid();
    const stmt = sqliteDB.prepare('UPDATE user SET csrf_token = ? WHERE session_id = ?');
    stmt.run(csrf_token, session_id);
    return csrf_token;
};
