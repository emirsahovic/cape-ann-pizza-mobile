import apiService from "../../../service/apiService";

// Sending requests to the backend using created apiService (axios instance)
// Methods below are used in actionCreators.js file for dispatching actions

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

const addPizza = async (newData) => {
  const { data } = await apiService.post("/pizza", newData);
  return data;
};

const updatePizza = async (id, newData) => {
  const { name, picture, price, description, category, ingredients, rating } = newData;
  try {
    await apiService.put(
      `/pizza?id=${id}&name=${name}&picture=${picture}&description=${description}&category=${category}&ingredients=${ingredients}&rating=${rating}&price=${price}`
    );
  } catch (error) {
    console.log(error.message);
  }
};

const pizzaService = {
  getPizzas,
  getPizzaById,
  deletePizza,
  getPizzasByCat,
  getPizzasBySearch,
  updatePizza,
  addPizza,
};

export default pizzaService;
