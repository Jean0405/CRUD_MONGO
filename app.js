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

//CONFIGURACIÓN DE ENTORNO
dotenv.config();

//MIDDLEWARES
const APP = express();
APP.use(express.json());
APP.use(morgan("dev"));

//RUTAS PRINCIPALES
APP.use("/cliente", CLIENTE);
APP.use("/sucursal", SUCURSAL);
APP.use("/automovil", AUTOMOVIL);
APP.use("/alquiler", ALQUILER);
APP.use("/reserva", RESERVA);
APP.use("/empleado", EMPLEADO);

//ESCUCHA DEL SERVIDOR
const SERVER = JSON.parse(process.env.SERVER_CONFIG);
APP.listen(SERVER, () =>
  console.log(`http://${SERVER.hostname}:${SERVER.port}`)
);
