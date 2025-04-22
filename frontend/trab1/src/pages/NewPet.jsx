import { useState } from "react";
import { createPet } from "../services/petService";
import { useNavigate } from "react-router-dom";

export default function NewPet() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
    nome: "",
    especie: "Cão",
    raca: "",
    dataNascimento: "",
    sexo: "F",
    fotoUrl: "",
    });
    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const uploadImagem = async (file) => {
        const formData = new FormData();
        formData.append("imagem", file);
      
        const response = await fetch("http://localhost:4000/api/upload", {
          method: "POST",
          body: formData,
        });
      
        const data = await response.json();
        return data.imageUrl;
      };
      

      const salvar = async (e) => {
        e.preventDefault();
        try {
          let imageUrl = "";
          if (imagem) {
            imageUrl = await uploadImagem(imagem);
          }
      
          await createPet({ ...form, fotoUrl: imageUrl });
          navigate("/");
        } catch (err) {
          alert("Preencha todos os campos antes de submeter!");
          console.error("Erro ao criar pet", err);
        }
      };
      

    return (
        <div className="p-6 max-w-xl mx-auto">


            <h2 className="text-xl font-semibold mb-4">Cadastrar novo pet</h2>

            <form onSubmit={salvar} className="sapce-y-4"> 
                <input name="nome" placeholder="Nome" className="input" value={form.nome} onChange={handleChange}/>

                <select name="especie" className="input" value={form.especie} onChange={handleChange}>
                    <option value="Cão">Cão</option>
                    <option value="Gato">Gato</option>
                    <option value="Pássaro">Pássaro</option>
                    <option value="Peixe">Peixe</option>
                    <option value="Réptil">Réptil</option>
                    <option value="Roedor">Roedor</option>
                    <option value="Outro">Outro</option>
                </select>

                <input name="raca" placeholder="Raça" className="input" value={form.raca} onChange={handleChange} />
                <input type="date" name="dataNascimento" className="input" value={form.dataNascimento} onChange={handleChange} />
                
                <select name="sexo" className="input" value={form.sexo} onChange={handleChange}>
                <option value="F">Fêmea</option>
                <option value="M">Macho</option>
                </select>

                <input
                    type="file"
                    accept="image/*"
                    className="input"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        setImagem(file);
                        setPreview(URL.createObjectURL(file));
                    }}
                />

                {preview && (
                <img src={preview} alt="Prévia" className="h-32 rounded shadow" />
                )}


                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Salvar
                </button>
            </form>
        </div>
    );
}