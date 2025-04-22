import { db } from "./../db.js"; 

export const listarPets = async (req, res) => {
    try {
        const [rows] =  await db.query("SELECT * FROM pets ORDER BY id DESC");
        res.json(rows);
    } catch (error) {
        console.error("Erro ao listar pets", error);
        res.status(500).json({ error: "Erro ao listar pets"});
    }
};

export const criarPet = async (req, res) => {
    const {nome, especie, raca, dataNascimento, sexo, fotoUrl } = req.body;
    if (!nome || !especie){
        return res.status(400).json({error: "Nome e espécie são obrigatórios"});
    }
    try{
        const[result] = await db.query(
            ` INSERT INTO pets (nome, especie, raca, dataNascimento, sexo, fotoUrl)
              VALUES (?, ?, ?, ?, ?, ?)`,
              [nome, especie, raca, dataNascimento, sexo, fotoUrl]
        );

        const novoPet = {
            id : result.insertId,
            nome, especie, raca, dataNascimento, sexo, fotoUrl
        };

        res.status(201).json(novoPet);
    } catch (error) {
        console.error("Erro ao criar pet", error);
        res.status(500).json({ error: "Erro ao cadastrar pet"});
    }
};

export const obterPetPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM pets WHERE id = ?", [id]); // evita SQL injection
        if (rows.length === 0) {
            return res.status(404).json({ error: "Pet não encontrado"});
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Erro ao buscar pet por ID:", error);
        res.status(500).json({ error: "Erro ao buscar pet"});
    }
};

export const atualizarPet = async (req, res) => {
    const { id } = req.params;
    const { nome, especie, raca, dataNascimento, sexo, fotoUrl } = req.body;
    try{
        const [result] = await db.query(
            `UPDATE pets
            SET nome = ?, especie = ?, raca = ?, dataNascimento = ?, sexo = ?, fotoUrl = ?
            WHERE id = ?`,
            [nome, especie, raca, dataNascimento, sexo, fotoUrl, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Pet não encontrado para atualização"});
        }
        res.json({mensagem: "Pet atualizado com sucesso"});
    } catch (error) {
        console.error("Erro ao atualizar pet", error);
        res.status(500).json({ error: "Erro ao atualizar pet"});
    }
};

export const deletarPet = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("DELETE FROM pets WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Pet não encontrado para exclusão"});
        }
        res.json({mensagem: "Pet removido com sucesso"});
    }catch (error) {
        console.error("Erro ao deletar pet", error);
        res.status(500).json({ error: "Erro ao deletar pet"});
    }
};

