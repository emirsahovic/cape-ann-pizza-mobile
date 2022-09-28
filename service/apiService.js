import axios from "axios";

const defaultOptions = {
  baseURL: "http://192.168.50.87:8070",
  headers: { "Content-Type": "application/json" },
};

let apiService = axios.create(defaultOptions);

export default apiService;
