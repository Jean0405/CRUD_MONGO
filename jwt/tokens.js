import "reflect-metadata";
import dotenv from "dotenv";
import { Router } from "express";
import { classToPlain, plainToClass } from "class-transformer";
import { SignJWT, jwtVerify } from "jose";

dotenv.config();
const GENERATE_TOKEN = Router();
const VERIFY_TOKEN = Router();

GENERATE_TOKEN.use("/:collection", async (req, res) => {
  try {
    let instance = plainToClass(
      eval(req.params.collection),
      {},
      { ignoreDecorators: true }
    );
    const encoder = new TextEncoder();
    const jwtConstructor = new SignJWT(
      Object.assign({}, classToPlain(instance))
    );
    const jwt = await jwtConstructor
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_KEY));
    req.data = jwt;
    res.status(201).send({ status: 201, message: jwt });
  } catch (error) {
    res.status(404).send({ status: 404, message: "Token no generado" });
  }
});

VERIFY_TOKEN.use("/", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(400).send({ status: 400, message: "Token no incluido" });

  try {
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_KEY)
    );
    req.data = jwtData;
    next();
  } catch (error) {
    res.status(498).send({ status: 489, message: "Token caducado" });
  }
});

export { GENERATE_TOKEN, VERIFY_TOKEN };
