import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4320/api/";


const getDateFrom = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let dt = date.getDate();
  
  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return year+'-' + month + '-'+dt;

};

const getDateTo = () => {
  let date = new Date();
  date.setDate(date.getDate() + 15);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let dt = date.getDate();
  
  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return year+'-' + month + '-'+dt;

};

const getAgenda = (medico) => {
  let fromDate = getDateFrom();
  let toDate = getDateTo();
  let qs = "?from=" + fromDate + "&to=" + toDate + "&medico=" + medico
  return axios.get(API_URL + "Agenda/" + qs, { headers: authHeader() });
};

const misTurnos = (paciente) => {
  return axios.get(API_URL + "Turno/?q=" + paciente, { headers: authHeader() });
};

const guardarTurno = (paciente, fecha, agenda) => {
  let pacienteId = parseInt(paciente);
  let estado = "Pendiete";
  let fecha_hora_turno = fecha;
  let agendaId = agenda;

  axios.post(API_URL + "Turno/", {
    pacienteId,
    estado,
    fecha_hora_turno,
    agendaId,
    headers: authHeader()
    })
    .then((response) => {

      return response.data;
  });
};

export default {
  getAgenda,
  guardarTurno,
  misTurnos,
};
