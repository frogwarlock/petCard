import { useEffect, useState } from "react";
import { getPets } from "../services/petService";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  /* ---------- ESTADOS ---------- */
  const [pets, setPets] = useState([]);
  const [petEditando, setPetEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({
    nome: "",
    especie: "",
    raca: "",
    dataNascimento: "",
    sexo: "",
    fotoUrl: "" // armazena url atual (se houver)
  });
  const [novaImagem, setNovaImagem] = useState(null); // arquivo selecionado

  /* ---------- BUSCA INICIAL ---------- */
  const buscarPets = async () => {
    try {
      const { data } = await getPets();
      setPets(data);
    } catch (err) {
      console.error("Erro ao buscar pets:", err);
    }
  };

  useEffect(() => {
    buscarPets();
  }, []);

  /* ---------- ABRIR MODAL ---------- */
  const abrirModalEdicao = (pet) => {
    setPetEditando(pet.id);
    setFormEdit({
      nome: pet.nome,
      especie: pet.especie,
      raca: pet.raca,
      dataNascimento: pet.dataNascimento.split("T")[0],
      sexo: pet.sexo,
      fotoUrl: pet.fotoUrl || ""
    });
    setNovaImagem(null);
  };

  /* ---------- EXCLUIR PET ---------- */
  const deletarPet = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este pet?")) {
      try {
        await axios.delete(`http://localhost:4000/api/pets/${id}`);
        buscarPets();
      } catch (err) {
        console.error("Erro ao excluir pet:", err);
        alert("Erro ao excluir pet");
      }
    }
  };

  /* ===================================================================== */
  /* =========================== RENDER ================================== */
  /* ===================================================================== */

  return (
    <>
      {/* ---------------------- MODAL EDIÇÃO ---------------------- */}
      {petEditando && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Editar Pet</h2>

            <form
              onSubmit={async (e) => {
              e.preventDefault();

              // ---------- VALIDAÇÃO BÁSICA ----------
              if (!formEdit.nome.trim() || !formEdit.especie.trim() || !formEdit.dataNascimento) {
                alert("Preencha Nome, Espécie e Data de Nascimento antes de salvar.");
                return;
              }
              try {
                /* ---------- upload nova imagem (se houver) ---------- */
                let novaUrl = formEdit.fotoUrl;

                if (novaImagem) {
                  const fd = new FormData();
                  fd.append("imagem", novaImagem);
                  const resp = await fetch("http://localhost:4000/api/upload", { method: "POST", body: fd });
                  const { imageUrl } = await resp.json();
                  novaUrl = imageUrl;

                  if (formEdit.fotoUrl) {
                    await fetch("http://localhost:4000/api/delete-img", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ path: formEdit.fotoUrl })
                    });
                  }
                }

                await axios.put(`http://localhost:4000/api/pets/${petEditando}`, { ...formEdit, fotoUrl: novaUrl });
                setPetEditando(null);
                setNovaImagem(null);
                buscarPets();
              } catch (err) {
                alert("Erro ao atualizar pet");
                console.error(err);
              }
            }}
            className="space-y-3"
            >
              <input type="text" className="input w-full" placeholder="Nome" value={formEdit.nome} onChange={(e) => setFormEdit({ ...formEdit, nome: e.target.value })} />
              <input type="text" className="input w-full" placeholder="Espécie" value={formEdit.especie} onChange={(e) => setFormEdit({ ...formEdit, especie: e.target.value })} />
              <input type="text" className="input w-full" placeholder="Raça" value={formEdit.raca} onChange={(e) => setFormEdit({ ...formEdit, raca: e.target.value })} />
              <input type="date" className="input w-full" value={formEdit.dataNascimento} onChange={(e) => setFormEdit({ ...formEdit, dataNascimento: e.target.value })} />
              <select className="input w-full" value={formEdit.sexo} onChange={(e) => setFormEdit({ ...formEdit, sexo: e.target.value })}>
                <option value="F">Fêmea</option>
                <option value="M">Macho</option>
              </select>

              {/* nova imagem */}
              <input type="file" accept="image/*" className="input w-full" onChange={(e) => setNovaImagem(e.target.files[0])} />

              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setPetEditando(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------- LISTAGEM ---------------------- */}
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold mb-4">Meus Pets</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pets.map((pet) => (
            <div key={pet.id} className="bg-white border border-violet-400 shadow-md rounded-lg p-4 hover:bg-purple-100 hover:shadow-lg transition flex flex-col items-center">
              <Link to={`/pets/${pet.id}`} className="w-full text-center mb-3">
                {pet.fotoUrl ? (
                  <img src={`http://localhost:4000${pet.fotoUrl}`} alt={`Foto de ${pet.nome}`} className="h-28 w-28 object-cover rounded-full mx-auto mb-2" />
                ) : (
                  <div className="h-28 w-28 bg-gray-200 rounded-full mb-2 mx-auto flex items-center justify-center text-sm text-gray-500">Sem foto</div>
                )}
                <h2 className="text-lg font-bold">{pet.nome}</h2>
              </Link>

              <div className="text-left w-full">
                <p><strong>Espécie:</strong> {pet.especie}</p>
                <p><strong>Raça:</strong> {pet.raca || "-"}</p>
                <p><strong>Sexo:</strong> {pet.sexo}</p>
                <p><strong>Nascimento:</strong> {new Date(pet.dataNascimento).toLocaleDateString()}</p>
              </div>

              <div className="flex space-x-4 mt-4">
                <button onClick={() => abrirModalEdicao(pet)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded">✏️ Editar</button>
                <button onClick={() => deletarPet(pet.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">🗑 Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
