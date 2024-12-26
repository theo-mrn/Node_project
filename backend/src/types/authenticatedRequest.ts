import { Request } from 'express';

// Définir le type étendu de Request
export interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}