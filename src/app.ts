import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.config';
dotenv.config();
const app = express();
conectarDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });