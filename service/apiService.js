import axios from "axios";

const defaultOptions = {
  // Put URL of backend that you use to the baseURL
  baseURL: "http://192.168.50.87:8070",
  headers: { "Content-Type": "application/json" },
};

let apiService = axios.create(defaultOptions);

export default apiService;
