import { Router } from "express";
import { connectDB } from "../db/conexion.js";
import { appMiddlewareEmpleadoVerify } from "../middleware/proxyEmpleado.js";

const EMPLEADO = Router();
let db = await connectDB();


//------------------LISTAR EMPLEADOS CON CARGO DE VENDEDOR----------------------
EMPLEADO.get("/vendedor", appMiddlewareEmpleadoVerify, async (req, res) => {
  try {
    const collection = db.collection("empleado");
    const data = await collection.find({ cargo: "VENDEDOR" }).toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los empleados",
      error: error,
    });
  }
});

EMPLEADO.get(
  "/cargos/GERENTE/ASISTENTE",
  appMiddlewareEmpleadoVerify,
  async (req, res) => {
    try {
      const collection = db.collection("empleado");
      const data = await collection
        .find({
          cargo: { $in: ["GERENTE", "ASISTENTE"] },
        })
        .toArray();
      res.send(data);
    } catch (error) {
      es.status(500).json({
        message: "Error al listar los empleados",
        error: error,
      });
    }
  }
);

export default EMPLEADO;
