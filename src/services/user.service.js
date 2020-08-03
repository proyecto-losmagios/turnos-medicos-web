import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:4310/api/";

const getPublicContent = (email) => {
  return axios.get(API_URL + "Paciente/Info", {});
};

const getUserBoard = () => {
  const currentUser = AuthService.getCurrentUser();
  return axios.get(API_URL + "Paciente/Info?email=" + currentUser.username, { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
//   getModeratorBoard,
//   getAdminBoard,
};
