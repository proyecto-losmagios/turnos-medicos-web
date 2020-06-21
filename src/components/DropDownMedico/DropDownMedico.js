import React from 'react';
import axios from 'axios';
import {API_MEDICO_URL} from '../../constants/apiContants';


class DropDownMedico extends React.Component {
    state = {
        medicos: []
    }
    componentDidMount() {
        axios.get(API_MEDICO_URL+'/Medico/')
            .then((response) => {
                console.log(response.data);
                this.setState({medicos: response.data})
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    render(){
        return <div className="drop-down">
            <p>Médico</p>
            <select>{
                this.state.medicos.map((obj) => {
                    return <option value={obj.medicoId}>{obj.apellido}, {obj.nombre}</option>
                })
            }</select>
            </div>;
    }

}

export default DropDownMedico;