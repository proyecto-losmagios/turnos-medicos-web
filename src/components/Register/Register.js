import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [obsa, setObraSocial] = useState("");
  const [fechanac, setFechaNac] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeNombre = (e) => {
    const nombre = e.target.value;
    setNombre(nombre);
  };

  const onChangeApellido = (e) => {
    const apellido = e.target.value;
    setApellido(apellido);
  };

  const onChangeObraSocial = (e) => {
    const obsa = e.target.value;
    setObraSocial(obsa);
  };

  const onChangeFechaNac = (e) => {
    const fechanac = e.target.value;
    setFechaNac(fechanac);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    setUsername(email);

  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage("Usuario Creado");
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <Input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeNombre}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <Input
                  type="text"
                  className="form-control"
                  name="apellido"
                  value={apellido}
                  onChange={onChangeApellido}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Obra Social</label>
                <Input
                  type="text"
                  className="form-control"
                  name="obsa"
                  value={obsa}
                  onChange={onChangeObraSocial}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellido">Fecha Nacimiento</label>
                <Input
                  type="text"
                  className="form-control"
                  name="fechanac"
                  value={fechanac}
                  onChange={onChangeFechaNac}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Registrarse</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
