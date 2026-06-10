import { Request, Response, NextFunction } from 'express';

export const cacheControl = (maxAge: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
      res.set('Cache-Control', `public, max-age=${maxAge}`);
    }
    next();
  };
};
