import { Router } from "express";
import { connectDB } from "../db/conexion.js";
import { limitRequests } from "../middleware/limit.js";

const CLIENTE = Router();
let db = await connectDB();

CLIENTE.use(limitRequests);

CLIENTE.get("/", async (req, res) => {
  try {
    const collection = db.collection("cliente");
    const data = await collection.find().toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los clientes",
      error: error,
    });
  }
});

export default CLIENTE;
