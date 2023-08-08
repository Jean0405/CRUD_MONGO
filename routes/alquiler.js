import { Router } from "express";
import { connectDB } from "../db/conexion.js";
import { limitRequests } from "../middleware/limit.js";
import { ObjectId } from "mongodb";

const ALQUILER = Router();
let db = await connectDB();

ALQUILER.use(limitRequests);

//-----------------LISTAR LOS ALQUILER QUE SE ENCUENTREN ACTIVOS-----------------
ALQUILER.get("/", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .aggregate([
        {
          $lookup: {
            from: "alquiler",
            localField: "DNI",
            foreignField: "ID_cliente",
            as: "Alquiler_activo",
          },
        },

        {
          $unwind: "$Alquiler_activo",
        },
        {
          $match: { "Alquiler_activo.estado": { $eq: "ACTIVO" } },
        },
        {
          $project: {
            ID_cliente: 0,
            "Alquiler_activo.ID_cliente": 0,
          },
        },
        {
          $group: {
            _id: "$_id",
            nombre: {
              $first: "$nombre",
            },
            apellido: {
              $first: "$apellido",
            },
            DNI: {
              $first: "$DNI",
            },
            telefono: {
              $first: "$telefono",
            },
            Alquiler_activo: { $push: "$Alquiler_activo" },
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error,
    });
  }
});

//------------------LISTAR ALQUILER POR ID ESPECIFICO----------------------
ALQUILER.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection.find({ _id: new ObjectId(id) }).toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error,
    });
  }
});

export default ALQUILER;
