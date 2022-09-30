import apiService from "../../../service/apiService";

const getPizzas = async () => {
  const { data } = await apiService.get("/pizza");
  return data;
};

const getPizzaById = async (id) => {
  const { data } = await apiService.get(`/pizza/${id}`);
  return data;
};

const deletePizza = async (id) => {
  const res = await apiService.delete(`/pizza/${id}`);
  return res.data.id;
};

const getPizzasByCat = async (cat) => {
  const { data } = await apiService.get(`/pizzaByCategory/${cat}`);
  return data;
};

const getPizzasBySearch = async (name) => {
  const { data } = await apiService.get(`/searchPizza/${name}`);
  return data;
};

const pizzaService = {
  getPizzas,
  getPizzaById,
  deletePizza,
  getPizzasByCat,
  getPizzasBySearch,
};

export default pizzaService;
