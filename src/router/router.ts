import { Router } from "express";
import { createUser, getCurrentUser } from "../controllers/user.controller";
import { login } from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

// Definir la ruta para crear un nuevo usuario
router.post("/register", createUser);
//User en session
router.get("/current-user", isAuthenticated, getCurrentUser);

//Auth
router.post("/login", login);

export default router;
