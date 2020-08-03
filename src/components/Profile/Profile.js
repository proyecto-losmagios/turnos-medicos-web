import React, { useState, useEffect } from "react";

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data[0]);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <h2>Datos del usuario</h2>
      <header className="jumbotron">
        <p><b>Nombre: </b>{content.nombre} {content.apellido}</p>
        <p><b>Email: </b>{content.email}</p>
        <p><b>Obra Social: </b>{content.obraSocial}</p>
        <p><b>Fecha Nacimiento: </b>{content.fechaNacimiento}</p>
        <p><b>token: </b>{currentUser.token.substring(0, 20)} ...{" "}{currentUser.token.substr(currentUser.token.length - 20)}</p>
      </header>
    </div>
  );
};

export default Profile;
