import express from "express";
import { listarVacinasPorPet, adicionarVacina, atualizarVacina, deletarVacina } from "../Controllers/vacinaController.js";

const router = express.Router();

router.get("/:petId", listarVacinasPorPet);
router.post("/", adicionarVacina);
router.put("/:id", atualizarVacina);
router.delete("/:id", deletarVacina);

export default router;