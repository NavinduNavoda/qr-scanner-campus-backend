var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RegisterValidator } from "../../auth/validators/auth.validatord";
import sqliteDB from "../../sqlite/db.sqlite";
import { bhash } from "../util/hash";
import { z } from "zod";
import { createSession } from "./auth.session";
export const registerNewUser = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const validated = z.object(RegisterValidator).safeParse(values);
    if (validated.error) {
        throw validated.error;
    }
    const hashedPass = yield bhash(validated.data.password);
    const stmt = sqliteDB.prepare('INSERT INTO user (username, password, email, name, phone, sc_number, role) VALUES (?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(validated.data.username, hashedPass, validated.data.email, validated.data.name, validated.data.phone, validated.data.sc_number, validated.data.role);
    const sesssion_id = createSession(info.lastInsertRowid);
    return sesssion_id;
});
