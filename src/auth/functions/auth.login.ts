import { LoginValidator } from "../../auth/validators/auth.validatord";
import { z } from "zod";
import sqliteDB from "../../sqlite/db.sqlite";
import { bcompare } from "../util/hash";
import { createSession } from "./auth.session";

export const LoginUser = async (values: any) => {
    const validated = z.object(LoginValidator).safeParse(values);
    if(validated.error){
        throw validated.error;
    }

    const stmt = sqliteDB.prepare('SELECT * FROM user WHERE username = ?');
    const user: any = stmt.get(validated.data.username);
    if(!user){
        throw new Error("User not found");
    }

    const match = await bcompare(validated.data.password, user.password);
    if(!match){
        throw new Error("Invalid credentials");
    }

    const sesssion_id = await createSession(user.id);
    return {sesssion_id, role: user.role, user_id: user.id};
}
