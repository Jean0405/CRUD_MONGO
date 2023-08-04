import { Router } from "express";
import { connectDB } from "../db/conexion.js";
import { ObjectId } from "mongodb";
import { limitGET } from "../middleware/limit.js";
import { validateJsonSize } from "../middleware/validarJson.js";

const PAIS = Router();
let db = await connectDB();

// const collections = await db.listCollections().toArray();
// const bandera = collections.some((collection) => collection.name === "pais");
// console.log(bandera);
PAIS.use(limitGET());
PAIS.use(validateJsonSize);

PAIS.post("/", async (req, res) => {
  const collection = db.collection("pais");
  await collection.insertOne(req.body);
  console.log(req.rateLimit);
  res.send({ message: "Nuevo país creado", info: req.body });
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al insertar un país", error: error.message });
  }
});

PAIS.get("/", async (req, res) => {
  try {
    const collection = db.collection("pais");
    const data = await collection.find().toArray();
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al listar los paises", error: error.message });
  }
});

PAIS.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = db.collection("pais");
  await collection.deleteOne({ _id: new ObjectId(id) });
  console.log(req.rateLimit);
  res.send("El país ha sido borrado");
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar un país", error: error.message });
  }
});

export default PAIS;
