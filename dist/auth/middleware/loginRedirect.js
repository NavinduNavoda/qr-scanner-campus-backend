import { CheckSession } from '../../auth/functions/auth.check';
export const LoginRedirect = (req, res, next) => {
    console.log("[+] LoginRedirect middleware called");
    if (req.method === 'GET') {
        console.log("[+] LoginRedirect middleware called with GET method", req.cookies["session"]);
        if (req.cookies["session"] && CheckSession(req.cookies["session"], "student")) {
            console.log("[+] Session is valid");
            return res.redirect("/admin/dashboards/crm");
        }
        else {
            next();
        }
    }
    else {
        next();
    }
};
