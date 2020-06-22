import React, {useState} from 'react';
// import axios from 'axios';
import './LoginForm.css';
// import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "email":state.email,
            "password":state.password,
        }

        // cuando este la api para auth sacar esto
        setState(prevState => ({
            ...prevState,
            'successMessage' : 'Login successful. Redirecting to home page..'
        }))
        redirectToHome();
        props.showError(null)

        // axios.post(API_BASE_URL+'login', payload)
        //     .then(function (response) {
        //         if(response.data.code === 200){
        //             setState(prevState => ({
        //                 ...prevState,
        //                 'successMessage' : 'Login OK...'
        //             }))
        //             redirectToHome();
        //             props.showError(null)
        //         }
        //         else{
        //             props.showError("Usuario o contraseña incorrecto.");
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    // const redirectToRegister = () => {
    //     props.history.push('/register'); 
    //     props.updateTitle('Register');
    // }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Ingrese su email" 
                       value={state.email}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Ingrese su contraseña"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            {/* <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div> */}
        </div>
    )
}

export default withRouter(LoginForm);