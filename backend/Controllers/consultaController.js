import { db } from "../db.js";

export const listarConsultasPorPet = async (req, res) => {
    const { petId } = req.params;

    try {
        const [rows] = await db.query("SELECT * FROM consultas WHERE petId = ?", [petId]);
        res.json(rows);
    } catch (error) {
        console.error("Erro ao listar consultas", error);
        res.status(500).json({ error: "Erro ao buscar consultas"});
    }
};

export const adicionarConsulta = async (req, res) => {
    const { petId, veterinario, dataConsulta, motivo, observacoes} = req.body;

    if (!veterinario || !dataConsulta) {
        return res.status(400).json({ error: "Veterinário e data da consulta são obrigatórios" });
    }

    try{
        const [result] = await db.query(
            `INSERT INTO consultas (petId, veterinario, dataConsulta, motivo, observacoes)
            VALUES (?, ?, ?, ?, ?)`,
            [petId, veterinario, dataConsulta, motivo, observacoes]
        );
        res.status(201).json({
            id: result.insertId,
            petId, veterinario, dataConsulta, motivo, observacoes
        });
    } catch (error) {
        console.error("Erro ao adicionar consulta:", error);
        res.status(500).json({ error: "Erro ao cadastrar consulta" });
    }
};

export const atualizarConsulta = async (req, res) => {
    const { id } = req.params;
    const { veterinario, dataConsulta, motivo, observacoes } = req.body;

    try{
        const [result] = await db.query(
            `UPDATE consultas
            SET veterinario = ?, dataConsulta = ?, motivo = ?, observacoes = ?
            WHERE id = ?`,
            [veterinario, dataConsulta, motivo, observacoes, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Consulta não encontrada para atualização" });
        }
        res.json({ mensagem: "Consulta atualizada com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar consulta:", error);
        res.status(500).json({ error: "Erro ao atualizar consulta" });
    }
};

export const deletarConsulta = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("DELETE FROM consultas WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Consulta não encontrada para exclusão" });
        }
        res.json({ mensagem: "Consulta excluída com sucesso" });
    }catch (error) {
        console.error("Erro ao excluir consulta:", error);
        res.status(500).json({ error: "Erro ao excluir consulta" });
    }
}