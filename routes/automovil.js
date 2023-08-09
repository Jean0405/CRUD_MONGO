import { Router } from "express";
import { connectDB } from "../db/conexion.js";
import { limitRequests } from "../middleware/limit.js";

const AUTOMOVIL = Router();
let db = await connectDB();

AUTOMOVIL.use(limitRequests);

AUTOMOVIL.get("/", async (req, res) => {
  try {
    const collection = db.collection("automovil");
    const data = await collection
      .aggregate([
        {
          $match: { estado: "DISPONIBLE" },
        },
        {
          $lookup: {
            from: "automovil",
            localField: "ID_automovil",
            foreignField: "_id",
            as: "Automoviles disponibles",
          },
        },
        {
          $project: {
            ID_automovil: 0,
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los automoviles",
      error: error.message,
    });
  }
});

//Mostrar todos los automóviles con una capacidad mayor a 5
AUTOMOVIL.get("/capacidad=5", async (req, res) => {
  try {
    const collection = db.collection("automovil");
    const data = await collection.find({ capacidad: { $gte: 5 } });
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los automoviles",
      error: error.message,
    });
  }
});

// Listar todos los automóviles ordenados por marca y modelo.
AUTOMOVIL.get("/sort", async (req, res) => {
  try {
    const collection = db.collection("automovil");
    const data = await collection.find().sort({
      marca: 1,
      modelo: -1,
    });
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los automoviles",
      error: error.message,
    });
  }
});

export default AUTOMOVIL;
