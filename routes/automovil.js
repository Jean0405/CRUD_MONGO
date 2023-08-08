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
      error: error,
    });
  }
});

export default AUTOMOVIL;
