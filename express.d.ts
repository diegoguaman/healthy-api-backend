import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      currentUserId?: string; // Puedes usar el tipo que necesites, por ejemplo, string
    }
  }
}
