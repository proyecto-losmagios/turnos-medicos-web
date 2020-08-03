import React from "react";
import MedicoService from "../../services/medico.service";


class Medicos extends React.Component {

  state = {
    medicos: []
  };

  componentDidMount() {
    MedicoService.getEspecialidades();
    MedicoService.getMedicos().then(
      (response) => {
            this.setState({medicos: response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
  };

  verAgenda(medico){
    localStorage.setItem("agenda", JSON.stringify(medico));
    this.props.history.push("/agenda");  
    window.location.reload();  
  }

  render(){
    return <div class="row col-md-12">
      <h1>Médicos</h1>
      <table class="table table-striped custab">
      {
        this.state.medicos.map((obj) => {
          var esp = MedicoService.getEspecialidadById(obj.especialidadId);
          return <tr>
            <td>{obj.apellido} {obj.nombre}</td>
            <td>{esp.nombre} (Código: {esp.codigo})</td>
            <td class="text-center"><button class='btn btn-info btn-xs' onClick={() => this.verAgenda(obj)}>
              <span class="glyphicon glyphicon-edit"></span> Ver Turnos disponibles</button>
            </td>
          </tr>   
        })
      }
        </table>
      </div>;
  }

};

export default Medicos;
