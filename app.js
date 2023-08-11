console.clear();
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import SUCURSAL from "./routes/sucursal.js";
import CLIENTE from "./routes/cliente.js";
import AUTOMOVIL from "./routes/automovil.js";
import ALQUILER from "./routes/alquiler.js";
import RESERVA from "./routes/reserva.js";
import EMPLEADO from "./routes/empleado.js";
import { GENERATE_TOKEN, VERIFY_TOKEN } from "./jwt/tokens.js";

//CONFIGURACIÓN DE ENTORNO
dotenv.config();
//MIDDLEWARES
const APP = express();
APP.use(express.json());
APP.use(morgan("dev"));

//RUTAS PRINCIPALES
APP.use("/token", GENERATE_TOKEN); //Este endpoints es el encargado de generar el token
APP.use("/cliente", VERIFY_TOKEN, CLIENTE);
APP.use("/sucursal", VERIFY_TOKEN, SUCURSAL);
APP.use("/automovil", VERIFY_TOKEN, AUTOMOVIL);
APP.use("/alquiler", VERIFY_TOKEN, ALQUILER);
APP.use("/reserva", VERIFY_TOKEN, RESERVA);
APP.use("/empleado", VERIFY_TOKEN, EMPLEADO);

//ESCUCHA DEL SERVIDOR
const SERVER = JSON.parse(process.env.SERVER_CONFIG);
APP.listen(SERVER, () =>
  console.log(`http://${SERVER.hostname}:${SERVER.port}`)
);
