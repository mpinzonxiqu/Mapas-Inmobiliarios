import axios from "axios";

const API = "http://localhost:8000"; // cambia si usas Docker o dominio

export const getProyectos = async () => {
  const res = await axios.get(`${API}/proyectos/`);
  return res.data;
};
