import { ACTION_TYPES } from "./actionTypes";
import pizzaService from "../service/pizzaService";

export const getPizzas = () => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.GET_PIZZAS_REQUEST }); // Dispatch this action if data is loading, so you can show loading spinner in the component where you are using that data

    const data = await pizzaService.getPizzas(); // Store response data that you received from the backend to data variable using getPizzas method from the created pizzaService for sending requests

    dispatch({
      // Dispatch this action if data is successfully received from the backend (there is no error) and send payload (your data) to the pizza reducer so you can modify inital state
      type: ACTION_TYPES.GET_PIZZAS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      // Dispatch this action if there is an error while fetching data from the backend and send payload (error message) to the pizza reducer so you can modify inital state
      type: ACTION_TYPES.GET_PIZZAS_ERROR,
      payload: error.message,
    });
  }
};

export const getPizzaById = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.GET_PIZZA_REQUEST });

    const data = await pizzaService.getPizzaById(id);

    dispatch({
      type: ACTION_TYPES.GET_PIZZA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.GET_PIZZA_ERROR,
      payload: error.message,
    });
  }
};

export const getPizzasByCat = (cat) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.GET_PIZZAS_REQUEST });

    const data = await pizzaService.getPizzasByCat(cat);

    dispatch({
      type: ACTION_TYPES.GET_PIZZAS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.GET_PIZZAS_ERROR,
      payload: error.message,
    });
  }
};

export const getPizzasBySearch = (name) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.GET_PIZZAS_REQUEST });

    const data = await pizzaService.getPizzasBySearch(name);

    dispatch({
      type: ACTION_TYPES.GET_PIZZAS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.GET_PIZZAS_ERROR,
      payload: error.message,
    });
  }
};

export const addPizza = (newData) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.ADD_PIZZA_REQUEST });

    const data = await pizzaService.addPizza(newData);

    dispatch({
      type: ACTION_TYPES.ADD_PIZZA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.ADD_PIZZA_ERROR,
      payload: error.message,
    });
  }
};

export const deletePizza = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.DELETE_PIZZA_REQUEST });

    const data = await pizzaService.deletePizza(id);

    dispatch({
      type: ACTION_TYPES.DELETE_PIZZA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.DELETE_PIZZA_ERROR,
      payload: error.message,
    });
  }
};
