import express, { Request, Response, NextFunction } from 'express';


export const SessionAndCsrfCookieRefresh = (req: Request, res: Response, next: NextFunction) => {
    
    // Check if the cookie exists
    if (req.cookies["session"]) {
        // Extend expiration time
        res.cookie("session", req.cookies["session"], {httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
    }
    if (req.cookies["csrf"]) {
        // Extend expiration time
        res.cookie("csrf", req.cookies["csrf"], {sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
    }
  
    next();
  }