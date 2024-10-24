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