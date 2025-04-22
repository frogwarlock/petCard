import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api/vacinas",
});

export const getVacinasByPetId = (petId) => api.get(`/${petId}`);
export const createVacina = (vacina) => api.post("/", vacina);
export const updateVacina = (id, vacina) => api.put(`/${id}`, vacina);
export const deleteVacina = (id) => api.delete(`/${id}`);

