var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createTokenCSRFbySessionId } from "../../auth/functions/auth.cstf";
import { LoginUser } from "../../auth/functions/auth.login";
// import { registerNewUser } from "auth/functions/auth.register";
import { Router } from "express";
const AuthRouter = Router();
AuthRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sesssion_id, role } = yield LoginUser(req.body);
        const csrfToken = createTokenCSRFbySessionId(sesssion_id);
        res.cookie("session", sesssion_id, { httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2 });
        res.cookie("csrf", csrfToken, { sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2 });
        res.status(200).json({ message: "Login successful", role: role });
    }
    catch (e) {
        res.clearCookie("session");
        res.clearCookie("csrf");
        res.status(400).json({ message: "Login faild" });
    }
}));
AuthRouter.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("session");
    res.clearCookie("csrf");
    res.redirect("/auth/login");
    res.status(200).json({ message: "Logout successful" });
}));
// AuthRouter.post("/register", async (req, res) => {
//     try{
//         const sessionId = await registerNewUser(req.body);
//         const csrfToken = createTokenCSRFbySessionId(sessionId);
//         console.log("[+] csrfToken: ", csrfToken);
//         res.cookie("session", sessionId, {httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
//         res.cookie("csrf", csrfToken, {sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
//         res.status(200).json({message: "Registration successful"});
//     } catch(e){
//         console.log("[+] Error: ", e);
//         res.clearCookie("session");
//         res.clearCookie("csrf");
//         res.status(400).json({message: "Registration faild"});
//     }
// });
export default AuthRouter;
