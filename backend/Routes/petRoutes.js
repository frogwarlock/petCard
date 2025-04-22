import express from "express";
import { listarPets, criarPet, obterPetPorId, atualizarPet, deletarPet } from "../Controllers/petController.js";

const router = express.Router();

router.get("/", listarPets);
router.post("/", criarPet);
router.get("/:id", obterPetPorId);
router.put("/:id", atualizarPet);
router.delete("/:id", deletarPet);

export default router;