import { isAboveRole } from "./auth.roles";
import sqliteDB from "../../sqlite/db.sqlite";
export const CheckSession = (session_id, roleCheckAbove) => {
    const stmt = sqliteDB.prepare('SELECT * FROM user WHERE session_id = ?');
    const user = stmt.get(session_id);
    if (!user) {
        return false;
    }
    return isAboveRole(user.role, roleCheckAbove);
};
export const CheckSessionAndCSRF = (session_id, csrf_token, roleCheckAbove) => {
    const stmt = sqliteDB.prepare('SELECT * FROM user WHERE session_id = ?');
    const user = stmt.get(session_id);
    if (!user) {
        return false;
    }
    if (user.csrf_token !== csrf_token) {
        return false;
    }
    console.log("Checking Role ....", user.role, roleCheckAbove);
    return isAboveRole(user.role, roleCheckAbove);
};
