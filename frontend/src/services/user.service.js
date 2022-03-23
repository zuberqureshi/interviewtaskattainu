import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:27017/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "home");
};

const getallrestaurant = (text) => {
  const data =  { name: text };


  return axios.post(API_URL + "getallrestaurant", data,  { headers: authHeader()  }  );
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getallrestaurant,
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
