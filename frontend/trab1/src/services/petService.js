import axios from 'axios';

const api = axios.create({
baseURL: "http://localhost:4000/api/pets"
});

export const getPets = () => api.get("/");
export const createPet = (data) => api.post("/", data);
export const getPetById = (id) => api.get(`/${id}`);