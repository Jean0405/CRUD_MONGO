import "reflect-metadata";
import dotenv from "dotenv";
import { Router } from "express";
import { classToPlain, plainToInstance } from "class-transformer";
import { SignJWT, jwtVerify } from "jose";
/*Hay que importar los DTO de cada tabla
para que cuando se envien al params este ya este importado en este archivo*/
import { Sucursal } from "../storage/controllers/sucursal.js";
import { Automovil } from "../storage/controllers/automovil.js";
import { Alquiler } from "../storage/controllers/alquiler.js";
import { Clientes } from "../storage/controllers/clientes.js";
import { Empleados } from "../storage/controllers/empleado.js";
import { Reserva } from "../storage/controllers/reserva.js";

dotenv.config();
const GENERATE_TOKEN = Router();
const VERIFY_TOKEN = Router();

const instanceDTO = (className) => {
  const classMap = {
    sucursal: Sucursal,
    automovil: Automovil,
    alquiler: Alquiler,
    cliente: Clientes,
    empleado: Empleados,
    reserva: Reserva,
  };

  const Class = classMap[className];
  return Class
    ? plainToInstance(Class, {}, { ignoreDecorators: true })
    : undefined;
};

GENERATE_TOKEN.use("/:collection", async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const instance = instanceDTO(collectionName);

    if (!instance)
      return res.status(404).send({
        status: 404,
        message: "ERROR: La colección no ha sido encontrada",
      });
    const encoder = new TextEncoder();
    const jwtConstructor = new SignJWT(
      Object.assign({}, classToPlain(instance))
    );

    req.data = await jwtConstructor
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.PRIVATE_KEY));
    res.status(201).send({ status: 201, message: req.data });
  } catch (error) {
    res
      .status(404)
      .send({ status: 404, message: "ERROR: Token solicitado no es valido" });
  }
});

VERIFY_TOKEN.use("/", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res
      .status(400)
      .send({ status: 400, message: "Token no asignado en el header" });
  try {
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(
      authorization,
      encoder.encode(process.env.PRIVATE_KEY)
    );
    req.data = jwtData;
    next();
  } catch (error) {
    res
      .status(498)
      .send({ status: 498, message: "ERROR: Token no valido o expirado" });
  }
});

export { GENERATE_TOKEN, VERIFY_TOKEN };
