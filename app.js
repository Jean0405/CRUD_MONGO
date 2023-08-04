console.clear();
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import PAIS from "./routes/pais.js";

//CONFIGURACIÓN DE ENTORNO
dotenv.config();

//MIDDLEWARES
const APP = express();
APP.use(express.json());
APP.use(morgan("dev"));

//RUTAS PRINCIPALES
APP.use("/pais", PAIS);

//ESCUCHA DEL SERVIDOR
const SERVER = JSON.parse(process.env.SERVER_CONFIG);
APP.listen(SERVER, () =>
  console.log(`http://${SERVER.hostname}:${SERVER.port}`)
);
