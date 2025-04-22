import { db } from "./../db.js";

export const listarVacinasPorPet = async (req, res) => {
    const { petId } = req.params;

    try {
        const [rows] = await db.query("SELECT * FROM vacinas WHERE petId = ?", [petId]);
        res.json(rows);
    } catch (error) {
        console.error("Erro ao listar vacinas", error);
        res.status(500).json({ error: "Erro ao buscar vacinas"});
    }
};

export const adicionarVacina = async (req, res) => {
    const { petId, nomeVacina, dataAplicacao, proximaDose } = req.body;

    if (!nomeVacina || !dataAplicacao || !proximaDose) { // Verifica se os campos obrigatórios estão preenchidos
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO vacinas (petId, nomeVacina, dataAplicacao, proximaDose)
            VALUES (?, ?, ?, ?)`,
            [petId, nomeVacina, dataAplicacao, proximaDose]
        );
        res.status(201).json({
            id: result.insertId,
            petId, nomeVacina, dataAplicacao, proximaDose
        });
    } catch (error) {
        console.error("Erro ao adicionar vacina:", error);
        res.status(500).json({ error: "Erro ao cadastrar vacina" });
    }
};

export const atualizarVacina = async (req, res) => {
    const { id } = req.params;
    const { nomeVacina, dataAplicacao, proximaDose } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE vacinas
            SET nomeVacina = ?, dataAplicacao = ?, proximaDose = ?
            WHERE id = ?`,
            [nomeVacina, dataAplicacao, proximaDose, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Vacina não encontrada para atualizar" });
        }

        res.json({mensagem: "Vacina atualizada com sucesso"});
    } catch (error) {
        console.error("Erro ao atualizar vacina:", error);
        res.status(500).json({ error: "Erro ao atualizar vacina" });
    }
};

export const deletarVacina = async (req, res) => {
    const { id } = req.params;

    try{
        const [result] = await db.query("DELETE FROM vacinas WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Vacina não encontrada para exclusão" });
        }
        res.json({ mensagem: "Vacina excluída com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir vacina:", error);
        res.status(500).json({ error: "Erro ao excluir vacina" });
    }
};


