import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import createError from "http-errors";

// Tipado para el objeto Request para incluir currentUserId
interface AuthenticatedRequest extends Request {
  currentUserId?: string; // Esta propiedad la agregamos para guardar el ID del usuario autenticado
}

export const isAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // Solicito si hay header de autorización
  const authorization = req.header("Authorization"); // "Bearer <token>" || null
  if (!authorization) {
    return next(createError(401, "Authorization header was not provided"));
  }

  const [schema, token] = authorization.split(" "); // "Bearer <token>" --> ["Bearer", "<token>"]

  if (schema !== "Bearer") {
    return next(createError(401, "Authorization schema is not supported"));
  }

  if (!token) {
    return next(createError(401, "A token must be provided"));
  }

  // Me aseguro que tengo schema y tengo token
  const secret = process.env.JWT_SECRET || "test"; // Define la clave secreta que se usará para verificar el token.

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(createError(401, "Invalid token"));
    }

    // decodedToken puede ser JwtPayload o string, así que se hace una comprobación
    if (typeof decodedToken === "object" && (decodedToken as JwtPayload).id) {
      req.currentUserId = (decodedToken as JwtPayload).id; // Extrae y guarda el ID del usuario
      next();
    } else {
      return next(createError(401, "Invalid token format"));
    }
  });
};
