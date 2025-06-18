import axios from "axios";
import type { Proyecto } from "../types";

export async function getProyectos(): Promise<Proyecto[]> {
  const res = await axios.get("http://localhost:8000/proyectos");
  return res.data;
}
