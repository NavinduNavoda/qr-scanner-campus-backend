import { createTokenCSRFbySessionId } from "../../auth/functions/auth.cstf";
import { LoginUser } from "../../auth/functions/auth.login";
// import { registerNewUser } from "auth/functions/auth.register";
import { Router } from "express";

const AuthRouter = Router();

AuthRouter.post("/login", async (req, res) => {
    try{
        console.log("[+] req.body: ", req.body);
        const {sesssion_id, role} = await LoginUser(req.body);
        const csrfToken = createTokenCSRFbySessionId(sesssion_id);

        res.cookie("session", sesssion_id, {httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
        res.cookie("csrf", csrfToken, {sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
        res.status(200).json({message: "Login successful", role: role});

    } catch(e){
        console.log("[+] Error: ", e);
        res.clearCookie("session");
        res.clearCookie("csrf");
        res.status(400).json({message: "Login faild"});
    }
    
});

AuthRouter.get("/logout", async (req, res) => {
    res.clearCookie("session");
    res.clearCookie("csrf");
    // res.redirect("/auth/login");
    res.status(200).json({message: "Logout successful"});
});

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