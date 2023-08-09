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

//Listar alquiler por fecha especifica
ALQUILER.get("/fecha_inicio", async (req, res) => {
  const { fecha_inicio } = req.body;
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .find({ fecha_inicio: fecha_inicio })
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error.message,
    });
  }
});

//Obtener la cantidad total de alquileres registrados en la base de datos.
ALQUILER.get("/cantidad_alquieres", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection.countDocuments().toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error.message,
    });
  }
});

//Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.
ALQUILER.get("/disponible/capacidad/:capacidad", async (req, res) => {
  const { capacidad } = req.params;
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .aggregate([
        {
          $lookup: {
            from: "automovil",
            localField: "ID_automovil",
            foreignField: "_id",
            as: "Alquiler_Info",
          },
        },
        {
          $match: {
            estado: "DISPONIBLE",
            "Alquiler_Info.capacidad": { $gte: capacidad },
          },
        },
        {
          $project: {
            _id: 1,
            "Alquiler_Info.ID_automovil": 1,
            "Alquiler_Info.marca": 1,
            "Alquiler_Info.modelo": 1,
            "Alquiler_Info.anio": 1,
            "Alquiler_Info.tipo": 1,
            "Alquiler_Info.capacidad": 1,
            "Alquiler_Info.precio_diario": 1,
            estado: 1,
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error.message,
    });
  }
});

//Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.
ALQUILER.get("/fecha_inicio_rango", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .find({ fecha_inicio: { $gte: "2023-07-05", $lte: "2023-07-10" } })
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error.message,
    });
  }
});

export default ALQUILER;
