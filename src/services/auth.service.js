import axios from "axios";

const API_URL = "http://authenticationuser.azurewebsites.net/api/users/";
const API_URL_PACIENTE = "http://localhost:4310/api/";

const register = (Username, email, Password, nombre, apellido, obra_social, fecha_nacimiento) => {
  let RoleId = 1;
  axios.post(API_URL_PACIENTE + "Paciente/", {
    nombre,
    apellido,
    email,
    obra_social,
    fecha_nacimiento
  });
  return axios.post(API_URL + "register", {
    Username,
    email,
    Password,
    RoleId,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
  });
  
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
