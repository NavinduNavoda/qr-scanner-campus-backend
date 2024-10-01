import sqliteDB from "../../sqlite/db.sqlite";
import { nanoid } from 'nanoid';
export const createSession = (userId) => {
    let sessionId = nanoid();
    while (sqliteDB.prepare('SELECT * FROM user WHERE session_id = ?').get(sessionId)) {
        sessionId = nanoid();
    }
    const stmt = sqliteDB.prepare('UPDATE user SET session_id = ? WHERE id = ?');
    stmt.run(sessionId, userId);
    return sessionId;
};
export const getUserIdFromSession = (sessionId) => {
    const user = sqliteDB.prepare('SELECT id FROM user WHERE session_id = ?').get(sessionId);
    return user ? user.id : null;
};
