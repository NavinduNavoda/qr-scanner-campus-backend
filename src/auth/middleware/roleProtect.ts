import { CheckSession } from '../../auth/functions/auth.check';
import { Request, Response, NextFunction } from 'express';

export const authProtectAboveStudent = (req: Request, res: Response, next: NextFunction) => {
    
    console.log('[+] Protected Middleware Called: ' + req.path);

    // refresh cookies
    if (req.cookies["session"]) res.cookie("session", req.cookies["session"], {httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
    if (req.cookies["csrf"]) res.cookie("csrf", req.cookies["csrf"], {sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
    
    if(req.cookies["session"] && CheckSession(req.cookies["session"], "student")){
        console.log("[+] Session is valid");
        next();
    }else{
        if (req.method === "GET") {
            return res.redirect("/auth/login");
        }else{
            return res.status(401).json({message: "Unauthorized"});
        }
    }
    
};

export const authProtectAboveDemo = (req: Request, res: Response, next: NextFunction) => {
    
    console.log('[+] Protected Middleware Called: ' + req.path);

    // refresh cookies
    if (req.cookies["session"]) res.cookie("session", req.cookies["session"], {httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
    if (req.cookies["csrf"]) res.cookie("csrf", req.cookies["csrf"], {sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
    
    if(req.cookies["session"] && CheckSession(req.cookies["session"], "demo")){
        console.log("[+] Session is valid");
        next();
    }else{
        if (req.method === "GET") {
            return res.redirect("/auth/login");
        }else{
            return res.status(401).json({message: "Unauthorized"});
        }
    }
    
};


export const authProtectAboveLecturer = (req: Request, res: Response, next: NextFunction) => {
    
    console.log('[+] Protected Middleware Called: ' + req.path);

    // refresh cookies
    if (req.cookies["session"]) res.cookie("session", req.cookies["session"], {httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
    if (req.cookies["csrf"]) res.cookie("csrf", req.cookies["csrf"], {sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
    
    if(req.cookies["session"] && CheckSession(req.cookies["session"], "lecturer")){
        console.log("[+] Session is valid");
        next();
    }else{
        if (req.method === "GET") {
            return res.redirect("/auth/login");
        }else{
            return res.status(401).json({message: "Unauthorized"});
        }
    }
    
};




