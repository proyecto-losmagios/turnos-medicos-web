import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Agenda from "./components/Agenda/Agenda";
import Medicos from "./components/Medicos/Medicos";
import MisTurnos from "./components/MisTurnos/MisTurnos";


const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Turnos Web
          </Link>
          <div className="navbar-nav mr-auto">
            {currentUser && ( 
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Inicio
                </Link>
              </li>
            )}
            {currentUser && (             
              <li className="nav-item">
                <Link to={"/medicos"} className="nav-link">
                  Medicos
                </Link>
              </li>
            )}
            {currentUser && (             
              <li className="nav-item">
                <Link to={"/mis-turnos"} className="nav-link">
                  Mis Turnos
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Salir
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Entrar
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Registrarse
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/medicos" component={Medicos} />
            <Route path="/agenda" component={Agenda} />
            <Route path="/mis-turnos" component={MisTurnos} />

          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
