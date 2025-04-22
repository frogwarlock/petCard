import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPetById } from "../services/petService";
import { getVacinasByPetId, createVacina, updateVacina, deleteVacina } from "../services/vacinaService";
import { getConsultasByPetId, createConsulta, updateConsulta, deleteConsulta } from "../services/consultaService";


export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState("vacinas");

  // Estados para vacinas
  const [vacinas, setVacinas] = useState([]);
  const [novaVacina, setNovaVacina] = useState({
    nomeVacina: "",
    dataAplicacao: "",
    proximaDose: "",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoVacinaId, setEditandoVacinaId] = useState(null);
  // Estados para consultas
  const [consultas, setConsultas] = useState([]);
  const [novaConsulta, setNovaConsulta] = useState({
    veterinario: "",
    dataConsulta: "",
    motivo:"",
    observacoes:""
  });
  const [mostrarFormularioConsulta, setMostrarFormularioConsulta] = useState(false);
  const [editandoConsultaId, setEditandoConsultaId] = useState(null);


  useEffect(() => {
    setLoading(true);

    getPetById(id)
      .then((res) => setPet(res.data))
      .catch((err) => console.error("Erro ao buscar pet:", err));

    getVacinasByPetId(id)
      .then((res) => setVacinas(res.data))
      .catch((err) => console.error("Erro ao buscar vacinas:", err))
      .finally(() => setLoading(false));

      getConsultasByPetId(id)
      .then((res) => setConsultas(res.data))
      .catch((err) => console.error("Erro ao buscar consultas:", err));
  }, [id]);

  if (loading) return <p className="text-center mt-6">Carregando...</p>;
  if (!pet) return <p className="text-center mt-6 text-red-500">Pet não encontrado</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        {pet.fotoUrl && (
          <img
            src={`http://localhost:4000${pet.fotoUrl}`}
            alt={`Foto de ${pet.nome}`}
            className="h-32 w-32 object-cover rounded-full mx-auto mb-4"
          />
        )}
        <h1 className="text-2xl font-bold mb-2">{pet.nome}</h1>

        <div className="text-left mt-4 space-y-1">
          <p><strong>Espécie:</strong> {pet.especie}</p>
          <p><strong>Raça:</strong> {pet.raca || "-"}</p>
          <p><strong>Sexo:</strong> {pet.sexo}</p>
          <p><strong>Nascimento:</strong> {new Date(pet.dataNascimento).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Abas */}
      <div className="flex justify-center mt-6 mb-4 space-x-4">
        <button
          onClick={() => setAbaAtiva("vacinas")}
          className={`px-4 py-2 rounded font-medium ${
            abaAtiva === "vacinas"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          🧪 Vacinas
        </button>
        <button
          onClick={() => setAbaAtiva("consultas")}
          className={`px-4 py-2 rounded font-medium ${
            abaAtiva === "consultas"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          📋 Consultas
        </button>
      </div>

      {/* Conteúdo das abas */}
      <div className="bg-white border rounded-lg shadow p-4">
        {abaAtiva === "vacinas" ? (
          <div>
            {/* Botão e formulário */}
            <button
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {mostrarFormulario ? "Cancelar" : "+ Adicionar vacina"}
            </button>

            {mostrarFormulario && (
                console.log("Mostrando formulário"),
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  
                  if (!novaVacina.nomeVacina || !novaVacina.dataAplicacao || !novaVacina.proximaDose) {
                    alert("Por favor, preencha todos os campos antes de salvar a vacina.");
                    return;
                  }
                  
                  try {
                    
                    await createVacina({ ...novaVacina, petId: id });
                    const res = await getVacinasByPetId(id);
                    setVacinas(res.data);
                    setNovaVacina({
                      nomeVacina: "",
                      dataAplicacao: "",
                      proximaDose: "",
                    });
                    setMostrarFormulario(false);
                  } catch (err) {
                    console.error("Erro ao adicionar vacina:", err);
                  }
                }}
                className="space-y-2 border p-4 rounded bg-gray-50 mb-6"
              >
                <input
                  type="text"
                  name="nomeVacina"
                  placeholder="Nome da vacina"
                  className="input w-full"
                  value={novaVacina.nomeVacina}
                  onChange={(e) =>
                    setNovaVacina({ ...novaVacina, nomeVacina: e.target.value })
                  }
                />
                <input
                  type="date"
                  name="dataAplicacao"
                  className="input w-full"
                  value={novaVacina.dataAplicacao}
                  onChange={(e) =>
                    setNovaVacina({ ...novaVacina, dataAplicacao: e.target.value })
                  }
                />
                <input
                  type="date"
                  name="proximaDose"
                  className="input w-full"
                  value={novaVacina.proximaDose}
                  onChange={(e) =>
                    setNovaVacina({ ...novaVacina, proximaDose: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </form>
            )}

            {/* Lista de vacinas */}
            {vacinas.length > 0 ? (
              <ul className="space-y-2">
                {vacinas.map((v) => (
                  <li key={v.id} className="border p-3 rounded bg-white shadow">
                  {editandoVacinaId === v.id ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                          await updateVacina(v.id, novaVacina);
                          const res = await getVacinasByPetId(id);
                          setVacinas(res.data);
                          setEditandoVacinaId(null);
                        } catch (err) {
                          console.error("Erro ao atualizar vacina:", err);
                        }
                      }}
                      className="space-y-2"
                    >
                      <input
                        type="text"
                        value={novaVacina.nomeVacina}
                        onChange={(e) => setNovaVacina({ ...novaVacina, nomeVacina: e.target.value })}
                        className="input w-full"
                      />
                      <input
                        type="date"
                        value={novaVacina.dataAplicacao}
                        onChange={(e) => setNovaVacina({ ...novaVacina, dataAplicacao: e.target.value })}
                        className="input w-full"
                      />
                      <input
                        type="date"
                        value={novaVacina.proximaDose}
                        onChange={(e) => setNovaVacina({ ...novaVacina, proximaDose: e.target.value })}
                        className="input w-full"
                      />
                      <div className="flex justify-end space-x-2">
                        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Salvar</button>
                        <button type="button" onClick={() => setEditandoVacinaId(null)} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancelar</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p><strong>Vacina:</strong> {v.nomeVacina}</p>
                      <p><strong>Aplicação:</strong> {new Date(v.dataAplicacao).toLocaleDateString()}</p>
                      <p><strong>Próxima dose:</strong> {new Date(v.proximaDose).toLocaleDateString()}</p>
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={() => {
                            setEditandoVacinaId(v.id);
                            setNovaVacina({
                              nomeVacina: v.nomeVacina,
                              dataAplicacao: v.dataAplicacao.split("T")[0],
                              proximaDose: v.proximaDose?.split("T")[0] || ""
                            });
                          }}
                          className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm("Deseja realmente excluir esta vacina?")) {
                              try {
                                await deleteVacina(v.id);
                                const res = await getVacinasByPetId(id);
                                setVacinas(res.data);
                              } catch (err) {
                                console.error("Erro ao excluir vacina:", err);
                              }
                            }
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          🗑 Excluir
                        </button>
                      </div>
                    </>
                  )}
                </li>
                
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Nenhuma vacina cadastrada ainda.</p>
            )}
          </div>
        ) : (
          <>
  <button
    onClick={() => setMostrarFormularioConsulta(!mostrarFormularioConsulta)}
    className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    {mostrarFormularioConsulta ? "Cancelar" : "+ Nova consulta"}
  </button>

  {mostrarFormularioConsulta && (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!novaConsulta.veterinario || !novaConsulta.dataConsulta || !novaConsulta.motivo || !novaConsulta.observacoes) {
          alert("Por favor, preencha todos os campos antes de salvar a consulta.");
          return;
        }

        try {
          await createConsulta({ ...novaConsulta, petId: id });
          const res = await getConsultasByPetId(id);
          setConsultas(res.data);
          setNovaConsulta({
            veterinario: "",
            dataConsulta: "",
            motivo: "",
            observacoes: ""
          });
          setMostrarFormularioConsulta(false);
        } catch (err) {
          console.error("Erro ao cadastrar consulta:", err);
        }
      }}
      className="space-y-2 border p-4 rounded bg-gray-50 mb-6"
    >
      <input
        type="text"
        name="veterinario"
        placeholder="Veterinário responsável"
        className="input w-full"
        value={novaConsulta.veterinario}
        onChange={(e) => setNovaConsulta({ ...novaConsulta, veterinario: e.target.value })}
      />
      <input
        type="date"
        name="dataConsulta"
        className="input w-full"
        value={novaConsulta.dataConsulta}
        onChange={(e) => setNovaConsulta({ ...novaConsulta, dataConsulta: e.target.value })}
      />
      <input
        type="text"
        name="motivo"
        placeholder="Motivo"
        className="input w-full"
        value={novaConsulta.motivo}
        onChange={(e) => setNovaConsulta({ ...novaConsulta, motivo: e.target.value })}
      />
      <textarea
        name="observacoes"
        placeholder="Observações"
        className="input w-full"
        value={novaConsulta.observacoes}
        onChange={(e) => setNovaConsulta({ ...novaConsulta, observacoes: e.target.value })}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Salvar
      </button>
    </form>
  )}

  {consultas.length > 0 ? (
    <ul className="space-y-2">
      {consultas.map((c) => (
        <li key={c.id} className="border p-3 rounded bg-white shadow">
          {editandoConsultaId === c.id ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await updateConsulta(c.id, { ...novaConsulta, petId: id });
                  const res = await getConsultasByPetId(id);
                  setConsultas(res.data);
                  setEditandoConsultaId(null);
                } catch (err) {
                  console.error("Erro ao atualizar consulta:", err);
                }
              }}
              className="space-y-2"
            >
              <input
                type="text"
                value={novaConsulta.veterinario}
                onChange={(e) => setNovaConsulta({ ...novaConsulta, veterinario: e.target.value })}
                className="input w-full"
              />
              <input
                type="date"
                value={novaConsulta.dataConsulta}
                onChange={(e) => setNovaConsulta({ ...novaConsulta, dataConsulta: e.target.value })}
                className="input w-full"
              />
              <input
                type="text"
                placeholder="Motivo"
                value={novaConsulta.motivo}
                onChange={(e) => setNovaConsulta({ ...novaConsulta, motivo: e.target.value })}
                className="input w-full"
              />
              <textarea
                placeholder="Observações"
                value={novaConsulta.observacoes}
                onChange={(e) => setNovaConsulta({ ...novaConsulta, observacoes: e.target.value })}
                className="input w-full"
              />
              <div className="flex justify-end space-x-2">
                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setEditandoConsultaId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <p><strong>Veterinário:</strong> {c.veterinario}</p>
              <p><strong>Data:</strong> {new Date(c.dataConsulta).toLocaleDateString()}</p>
              <p><strong>Motivo:</strong> {c.motivo || "-"}</p>
              <p><strong>Observações:</strong> {c.observacoes || "-"}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => {
                    setEditandoConsultaId(c.id);
                    setNovaConsulta({
                      veterinario: c.veterinario,
                      dataConsulta: c.dataConsulta.split("T")[0],
                      motivo: c.motivo || "",
                      observacoes: c.observacoes || ""
                    });
                  }}
                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={async () => {
                    if (window.confirm("Deseja realmente excluir esta consulta?")) {
                      try {
                        await deleteConsulta(c.id);
                        const res = await getConsultasByPetId(id);
                        setConsultas(res.data);
                      } catch (err) {
                        console.error("Erro ao excluir consulta:", err);
                      }
                    }
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  🗑 Excluir
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 italic">Nenhuma consulta cadastrada ainda.</p>
  )}

</>

        )}
      </div>
    </div>
  );
}
