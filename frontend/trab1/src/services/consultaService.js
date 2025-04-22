import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api/consultas",
});

export const getConsultasByPetId = (petId) => api.get(`/${petId}`);
export const createConsulta = (consulta) => api.post("/", consulta);
export const updateConsulta = (id, consulta) => api.put(`/${id}`, consulta);
export const deleteConsulta = (id) => api.delete(`/${id}`);