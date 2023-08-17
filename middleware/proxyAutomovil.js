import "reflect-metadata";
import { plainToInstance, classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { Router } from "express";
import { Automovil } from "../storage/controllers/automovil.js";

const appMiddlewareAutomovilVerify = Router();
const proxyAutomovil = Router();

appMiddlewareAutomovilVerify.use((req, res, next) => {
  if (!req.rateLimit) return;
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;
  let Clone = JSON.stringify(
    classToPlain(plainToInstance(Automovil, {}, { ignoreDecorators: true }))
  );
  let Verify = Clone === JSON.stringify(payload);
  !Verify
    ? res.status(406).send({ status: 406, message: "No estás autorizado" })
    : next();
});

proxyAutomovil.use(async (req, res, next) => {
  try {
    let data = plainToInstance(Automovil, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    req.data = undefined;
    next();
  } catch (err) {
    res.status(err.status).send(err);
  }
});

export { appMiddlewareAutomovilVerify, proxyAutomovil };
