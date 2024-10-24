import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/User.model";
import { IUser } from "./../models/User.model";

// Tipos de entrada esperados
interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const login = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const loginError = createError(401, "Email or password incorrect");
  const { email, password } = req.body;

  // Verificar que existan email y contraseña
  if (!email || !password) {
    return next(loginError);
  }

  try {
    // Buscar usuario por email
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return next(loginError);
    }

    // Verificar contraseña
    const match: boolean = await user.checkPassword(password);
    if (!match) {
      return next(loginError);
    }

    // Generar JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "test", {
      expiresIn: "3h",
    });

    // Responder con el token
    res.json({ token });
  } catch (err: any) {
    return next(createError(500, "Internal Server Error"));
  }
};
