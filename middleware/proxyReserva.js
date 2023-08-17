import "reflect-metadata";
import { plainToInstance, classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { Router } from "express";
import { Reserva } from "../storage/controllers/reserva.js";

const appMiddlewareReservaVerify = Router();
const proxyReserva = Router();

appMiddlewareReservaVerify.use((req, res, next) => {
  if (!req.rateLimit) return;
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;
  let Clone = JSON.stringify(
    classToPlain(plainToInstance(Reserva, {}, { ignoreDecorators: true }))
  );
  let Verify = Clone === JSON.stringify(payload);
  !Verify
    ? res.status(406).send({ status: 406, message: "No estás autorizado" })
    : next();
});

proxyReserva.use(async (req, res, next) => {
  try {
    let data = plainToInstance(Reserva, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    req.data = undefined;
    next();
  } catch (err) {
    res.status(err.status).send(err);
  }
});

export { appMiddlewareReservaVerify, proxyReserva };
