import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4300/api/";


const getMedicos = () => {
  return axios.get(API_URL + "Medico/", { headers: authHeader() });
};

const getEspecialidades = () => {
  return axios.get(API_URL + "Especialidad/", { headers: authHeader() })
    .then((response) => {
      localStorage.setItem("especialidades", JSON.stringify(response.data));
      return response.data;
  });
};

function getEspecialidadById(id) {
  return JSON.parse(localStorage.getItem('especialidades')).filter(obj => obj.especialidadId === String(id))[0]
}

export default {
  getMedicos,
  getEspecialidades,
  getEspecialidadById,
};
