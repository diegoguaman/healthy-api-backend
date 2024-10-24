import { NextFunction, Request, Response } from "express";
import User from "./../models/User.model";
import createError from "http-errors";

// Controlador simple para crear un usuario
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      next(createError(400, error.message));
    } else if (error.code === 11000) {
      next(createError(409, "Email already exists"));
    } else {
      next(createError(500, "Internal Server Error"));
    }
  }
};

//Obtener el usuario en sesion
export const getCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Usamos req.currentUserId que ha sido agregado por el middleware
  User.findById(req.currentUserId)
    .then((user) => {
      if (!user) {
        return next(createError(404, "User not found")); // Retorna el error si no se encuentra el usuario
      } else {
        res.json(user); // Devuelve la información del usuario
      }
    })
    .catch((error) => {
      next(error); // Maneja cualquier error que ocurra en la búsqueda
    });
};
