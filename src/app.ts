import express, { Application } from 'express';
import morgan from "morgan";
import dotenv from 'dotenv';
import conectarDB from './config/db.config';
import router from "./router/router";
dotenv.config();
conectarDB();
const app: Application = express();
app.use(express.json());
app.use(morgan("dev"))
app.use("/", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });