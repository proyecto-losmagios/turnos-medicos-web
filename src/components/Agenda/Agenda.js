import React, { useState, useEffect } from "react";

import MedicoService from "../../services/medico.service";
import TurnoService from "../../services/turno.service";
import UserService from "../../services/user.service";


const Agenda = (props) => {
  const [medico, setMedico] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [turnos, setTurno] = useState([]);
  const [paciente, setPaciente] = useState("");

  useEffect(() => {
    const agenda = JSON.parse(localStorage.getItem("agenda"))
    setMedico(agenda.nombre + " " + agenda.apellido);
    const esp = MedicoService.getEspecialidadById(agenda.especialidadId)
    setEspecialidad(esp.nombre);

    TurnoService.getAgenda(agenda.medicoId).then(
      (response) => {
            setTurno(response.data)
        })
        .catch((error)=>{
            console.log(error);
        });

    UserService.getUserBoard().then(
      (response) => {
        setPaciente(response.data[0].pacienteId);
      })
  }, []);

  const Agendar = (agenda)  => {
    TurnoService.guardarTurno(paciente, agenda.fecha, agenda.agendaId)
    props.history.push("/mis-turnos");
    window.location.reload();
    
  }

  return (
    <div className="container">
      <h2>Agenda de <span class="badge badge-secondary">
        {medico}</span> para la especialidad <span class="badge badge-secondary">
        {especialidad}</span>
      </h2>
      
      <table class="table table-striped custab">
      <tr>
         <th>Fecha</th>
         <th>Hora</th>
         <th></th>

      </tr>
      {
        turnos.map((obj) => {
          return <tr>
            <td>{obj.fecha.slice(0,10)}</td>
            <td>{obj.fecha.slice(11,20)}</td>
            <td class="text-center"><button class='btn btn-info btn-xs' onClick={() => Agendar(obj)}>
              <span class="glyphicon glyphicon-edit"></span> Reservar turno</button>
            </td>
          </tr>   
        })
      }
        </table>
    </div>
  );
};

export default Agenda;

