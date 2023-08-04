import { Router } from "express";
import { connectDB } from "../db/conexion.js";
import { ObjectId } from "mongodb";

const PAIS = Router();
let db = await connectDB();

// const collections = await db.listCollections().toArray();
// const bandera = collections.some((collection) => collection.name === "pais");
// console.log(bandera);

PAIS.post("/", async (req, res) => {
  const { nombre, ubicacion, poblacion } = req.body;

  const collection = db.collection("pais");
  await collection.insertOne({
    nombre: nombre,
    ubicacion: ubicacion,
    poblacion: poblacion,
  });
  res.send("Nuevo país creado");
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO INSERT COUNTRY", error: error.message });
  }
});

PAIS.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = db.collection("pais");
  await collection.deleteOne({ _id: new ObjectId(id) });
  res.send("El país ha sido borrado");
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO DELETE COUNTRY", error: error.message });
  }
});

export default PAIS;
