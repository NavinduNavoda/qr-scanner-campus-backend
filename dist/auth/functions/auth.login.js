var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LoginValidator } from "../../auth/validators/auth.validatord";
import { z } from "zod";
import sqliteDB from "../../sqlite/db.sqlite";
import { bcompare } from "../util/hash";
import { createSession } from "./auth.session";
export const LoginUser = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const validated = z.object(LoginValidator).safeParse(values);
    if (validated.error) {
        throw validated.error;
    }
    const stmt = sqliteDB.prepare('SELECT * FROM user WHERE username = ?');
    const user = stmt.get(validated.data.username);
    if (!user) {
        throw new Error("User not found");
    }
    const match = yield bcompare(validated.data.password, user.password);
    if (!match) {
        throw new Error("Invalid credentials");
    }
    const sesssion_id = createSession(user.id);
    return { sesssion_id, role: user.role };
});
