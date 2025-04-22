import express from "express";
import cors from "cors";
import petRoutes from "./Routes/petRoutes.js";
import vacinaRoutes from "./Routes/vacinaRoutes.js";
import consultaRoutes from "./Routes/consultaRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Servir as imagens da pasta uploads
app.use("/uploads", express.static("uploads"));

// Rota de upload
app.use("/api/upload", uploadRoutes);

app.use("/api/pets", petRoutes);
app.use("/api/vacinas", vacinaRoutes)
app.use("/api/consultas", consultaRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
