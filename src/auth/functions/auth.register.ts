import { RegisterValidator } from "../../auth/validators/auth.validatord";
import sqliteDB from "../../sqlite/db.sqlite";
import { bhash } from "../util/hash";
import { z } from "zod";
import { createSession } from "./auth.session";

export const registerNewUser = async (values: any) => {

    const validated = z.object(RegisterValidator).safeParse(values);
    if(validated.error){
        throw validated.error;
    }
     

    const hashedPass = await bhash(validated.data.password);
    const stmt = sqliteDB.prepare('INSERT INTO user (username, password, email, name, phone, sc_number, role) VALUES (?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(validated.data.username, hashedPass, validated.data.email, validated.data.name, validated.data.phone, validated.data.sc_number, validated.data.role);



    const sesssion_id = await createSession(info.lastInsertRowid);
    return sesssion_id;
}