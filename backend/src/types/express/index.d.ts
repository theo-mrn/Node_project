import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}


import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}
