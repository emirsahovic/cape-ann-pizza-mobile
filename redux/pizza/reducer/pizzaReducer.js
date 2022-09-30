import { ACTION_TYPES } from "../actions/actionTypes";

export const INITIAL_STATE = {
  loading: false,
  pizzas: [],
  pizza: {},
  error: false,
  message: "",
  success: false,
};

export const pizzaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_PIZZAS_REQUEST:
    case ACTION_TYPES.GET_PIZZA_REQUEST:
    case ACTION_TYPES.DELETE_PIZZA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.GET_PIZZAS_SUCCESS:
      return {
        ...state,
        loading: false,
        pizzas: action.payload,
        success: true,
      };
    case ACTION_TYPES.GET_PIZZA_SUCCESS:
      return {
        ...state,
        loading: false,
        pizza: action.payload,
      };
    case ACTION_TYPES.GET_PIZZAS_ERROR:
    case ACTION_TYPES.GET_PIZZA_ERROR:
    case ACTION_TYPES.DELETE_PIZZA_ERROR:
      return {
        message: action.payload,
        error: true,
        loading: false,
        pizzas: [],
        pizza: {},
        success: false,
      };
    case ACTION_TYPES.DELETE_PIZZA_SUCCESS:
      return {
        ...state,
        loading: false,
        pizzas: state.pizzas.filter((res) => res.id !== action.payload),
      };
    default:
      return state;
  }
};
