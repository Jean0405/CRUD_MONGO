import { Router } from "express";
import { connectDB } from "../db/conexion.js";
import { ObjectId } from "mongodb";
import { limitGET } from "../middleware/limit.js";
import { validateJsonSize } from "../middleware/validarJson.js";

const SUCURSAL = Router();
let db = await connectDB();

// const collections = await db.listCollections().toArray();
// const bandera = collections.some((collection) => collection.name === "pais");
// console.log(bandera);
SUCURSAL.use(validateJsonSize);

SUCURSAL.post("/", limitGET(), async (req, res) => {
  const collection = db.collection("sucursal");
  await collection.insertOne(req.body);
  console.log(req.rateLimit);
  res.send({ message: "Nueva sucursal creado", info: req.body });
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al insertar una sucural", error: error.message });
  }
});

SUCURSAL.get("/", async (req, res) => {
  try {
    const collection = db.collection("sucursal");
    const data = await collection.find().toArray();
    res.send(data);
  } catch (error) {
    res.status(500).json({
      message: "Error al listar las sucursales",
      error: error.message,
    });
  }
});

SUCURSAL.put("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = db.collection("sucursal");
  // await collection.deleteOne({ _id: new ObjectId(id) });
  await collection.updateOne({ _id: id }, { $set: req.body });
  res.send("La sucursal ha sido actualizada");
  try {
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar una sucursal",
      error: error.message,
    });
  }
});

SUCURSAL.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = db.collection("sucursal");
  // await collection.deleteOne({ _id: new ObjectId(id) });
  await collection.deleteOne({ _id: id });
  res.send("La sucursal ha sido borrada");
  try {
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar una sucursal",
      error: error.message,
    });
  }
});

export default SUCURSAL;
