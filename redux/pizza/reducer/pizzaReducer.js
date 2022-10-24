import { ACTION_TYPES } from "../actions/actionTypes";

// Initial state that will be changed in reducer below when you dispatch a particural action
// You should use states below in every component where you need access to those states
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
    // Loading state is set to true so you can show loading spinner (use loading state inside that component) while data is being loaded
    case ACTION_TYPES.GET_PIZZAS_REQUEST:
    case ACTION_TYPES.GET_PIZZA_REQUEST:
    case ACTION_TYPES.DELETE_PIZZA_REQUEST:
    case ACTION_TYPES.ADD_PIZZA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // States are set as below if data is successfully received from the backend
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
    // States are set as below if there is an error while fetching data from the backend
    case ACTION_TYPES.GET_PIZZAS_ERROR:
    case ACTION_TYPES.GET_PIZZA_ERROR:
    case ACTION_TYPES.DELETE_PIZZA_ERROR:
    case ACTION_TYPES.ADD_PIZZA_ERROR:
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
    case ACTION_TYPES.ADD_PIZZA_SUCCESS:
      return {
        ...state,
        loading: false,
        pizzas: [...state.pizzas, action.payload],
      };
    default:
      return state;
  }
};
