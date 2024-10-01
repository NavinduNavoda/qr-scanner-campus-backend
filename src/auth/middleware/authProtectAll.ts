import { Request, Response, NextFunction } from 'express';

export const authProtectAll = (req: Request, res: Response, next: NextFunction) => {
    const matchers = [
      /^\/((?!.*\..*|_next).*)/, // Matches all paths except those containing a dot (.) or starting with _next
      /^\/$/, // Matches the root path
      /^\/(api|trpc)(.*)/ // Matches paths starting with /api or /trpc
    ];

    // Check if the request path matches any of the patterns
    const isMatch = matchers.some(matcher => matcher.test(req.path));

    if (isMatch) {
        console.log('[+] Middleware Called: ' + req.path);

        // refresh cookies
        if (req.cookies["session"]) res.cookie("session", req.cookies["session"], {httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
        if (req.cookies["csrf"]) res.cookie("csrf", req.cookies["csrf"], {sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 2});
        



    }

    // Continue to the next middleware or route handler
    next();
  };