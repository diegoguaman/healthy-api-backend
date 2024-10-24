import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import createError from "http-errors";

// Tipado para el objeto Request para incluir currentUserId
interface AuthenticatedRequest extends Request {
  currentUserId?: string; // Esta propiedad la agregamos para guardar el ID del usuario autenticado
}

