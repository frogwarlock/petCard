import express from "express";
import { listarConsultasPorPet, adicionarConsulta, atualizarConsulta, deletarConsulta } from "../Controllers/consultaController.js";

const router = express.Router();

router.get("/:petId", listarConsultasPorPet);
router.post("/", adicionarConsulta);
router.put("/:id", atualizarConsulta);
router.delete("/:id", deletarConsulta)


export default router;