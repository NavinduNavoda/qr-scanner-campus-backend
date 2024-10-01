import sqliteDB from "../../sqlite/db.sqlite";
// import { nanoid } from "nanoid";
const { v4: uuidv4 } = require('uuid');

export const createSession = async (userId: number | bigint) => {
    // const nanoid = (await import('nanoid')).default;
    let sessionId = uuidv4();

    while (sqliteDB.prepare('SELECT * FROM user WHERE session_id = ?').get(sessionId)) {
        sessionId = uuidv4();
    }

    const stmt = sqliteDB.prepare('UPDATE user SET session_id = ? WHERE id = ?');
    stmt.run(sessionId, userId);
    return sessionId;
};

export const getUserIdFromSession = (sessionId: string) => {
    const user: any = sqliteDB.prepare('SELECT id FROM user WHERE session_id = ?').get(sessionId);
    return user ? user.id : null;
};
