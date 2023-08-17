import "reflect-metadata";
import { plainToInstance, classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { Router } from "express";
import { Empleados } from "../storage/controllers/empleado.js";

const appMiddlewareEmpleadoVerify = Router();
const proxyEmpleado = Router();

appMiddlewareEmpleadoVerify.use((req, res, next) => {
  if (!req.rateLimit) return;
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;
  let Clone = JSON.stringify(
    classToPlain(plainToInstance(Empleados, {}, { ignoreDecorators: true }))
  );
  let Verify = Clone === JSON.stringify(payload);
  !Verify
    ? res.status(406).send({ status: 406, message: "No estás autorizado" })
    : next();
});

proxyEmpleado.use(async (req, res, next) => {
  try {
    let data = plainToInstance(Empleados, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    req.data = undefined;
    next();
  } catch (err) {
    res.status(err.status).send(err);
  }
});

export { appMiddlewareEmpleadoVerify, proxyEmpleado };
