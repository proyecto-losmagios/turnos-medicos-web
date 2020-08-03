import React, { useState, useEffect } from "react";

import MedicoService from "../../services/medico.service";
import TurnoService from "../../services/turno.service";
import UserService from "../../services/user.service";


const MisTurnos = (props) => {
  const [turnos, setTurno] = useState([]);
  const [paciente, setPaciente] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setPaciente(response.data[0].pacienteId);
      })
      
    TurnoService.misTurnos(paciente).then(
      (response) => {
            setTurno(response.data)
        })
        .catch((error)=>{
            console.log(error);
        });

  }, []);


  return (
    <div className="container">
      <h2>Mis Turnos</h2>
      <table class="table table-striped custab">
      <tr>
         <th>Fecha</th>
         <th>Hora</th>
         <th>Estado</th>

      </tr>
      {
        turnos.map((obj) => {
          return <tr>
            <td>{obj.fechaHoraTurno.slice(0,10)}</td>
            <td>{obj.fechaHoraTurno.slice(11,20)}</td>
            <td>{obj.estado}</td>
          </tr>   
        })
      }
        </table>
    </div>
  );
};

export default MisTurnos;

