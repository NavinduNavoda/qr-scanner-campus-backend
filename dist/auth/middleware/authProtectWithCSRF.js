import { CheckSessionAndCSRF } from '../../auth/functions/auth.check';
export const authProtectWithCSRF = (req, res, next) => {
    console.log('[+] Protected Middleware Called: ' + req.path);
    // refresh cookies
    if (req.cookies["session"])
        res.cookie("session", req.cookies["session"], { httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2 });
    if (req.cookies["csrf"])
        res.cookie("csrf", req.cookies["csrf"], { sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2 });
    const csrfTokenFromHeader = req.headers['x-csrf-token'];
    if (csrfTokenFromHeader && req.cookies["csrf"]) {
        if (csrfTokenFromHeader !== req.cookies["csrf"]) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        else {
            if (req.cookies["session"] && CheckSessionAndCSRF(req.cookies["session"], csrfTokenFromHeader, "student")) {
                console.log("[+] Session and csrf is valid");
                next();
                return;
            }
        }
    }
    if (req.method === "GET") {
        return res.redirect("/auth/login");
    }
    else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
