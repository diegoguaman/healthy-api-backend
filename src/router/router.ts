import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { login } from "../controllers/auth.controller";

const router = Router();

// Definir la ruta para crear un nuevo usuario
router.post("/register", createUser);

//Auth
router.post("/login", login);

export default router;
