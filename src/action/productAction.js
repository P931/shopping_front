import axios from "axios";
import { BASE_URL } from "../services/Helper";


export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_ERROR = "CREATE_PRODUCT_ERROR";

export const GET_ALL_PRODUCT_SUCCESS = "GET_ALL_PRODUCT_SUCCESS";
export const GET_ALL_PRODUCT_ERROR = "GET_ALL_PRODUCT_ERROR";

export const ADD_TO_PRODUCT_CART_SUCCESS = "ADD_TO_PRODUCT_CART_SUCCESS";
export const ADD_TO_PRODUCT_CART_ERROR = "ADD_TO_PRODUCT_CART_ERROR";

export const INCRE_PRODUCT_QUANTITY_SUCCESS = "INCRE_PRODUCT_QUANTITY_SUCCESS";
export const INCRE_PRODUCT_QUANTITY_ERROR = "INCRE_PRODUCT_QUANTITY_ERROR";

export const DECRE_PRODUCT_QUANTITY_SUCCESS = "DECRE_PRODUCT_QUANTITY_SUCCESS";
export const DECRE_PRODUCT_QUANTITY_ERROR = "DECRE_PRODUCT_QUANTITY_ERROR";


export const createProduct = (product) => async (dispatch) => {

  try {

    const response = await axios.post(`${BASE_URL}/addProduct`, product);

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response?.data });

    return response;

  } catch (error) {

    dispatch({ type: CREATE_PRODUCT_ERROR, message: error.message });

    return error.message;
  }

};


export const getAllProductDetails = () => async (dispatch) => {

  try {

    const response = await axios.get(`${BASE_URL}/getAllProductCart`);

    dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: response?.data });

    return response;

  } catch (error) {

    dispatch({ type: GET_ALL_PRODUCT_ERROR, message: error.message });

    return error.message;

  }

};


export const addToProductCart = (product) => async (dispatch) => {

  try {

    const response = await axios.post(`${BASE_URL}/addToProductCart`, product);

    dispatch({ type: ADD_TO_PRODUCT_CART_SUCCESS, payload: response?.data });

    return response;

  } catch (error) {

    dispatch({ type: ADD_TO_PRODUCT_CART_ERROR, message: error.message });

    return error.message;

  }
};


export const increaseProductQuantity = (productId) => async (dispatch) => {

  try {

    const response = await axios.put(`${BASE_URL}/incrementProductQuantity`, { productId });

    dispatch({ type: INCRE_PRODUCT_QUANTITY_SUCCESS, payload: response?.data });

    return response;

  } catch (error) {

    dispatch({ type: INCRE_PRODUCT_QUANTITY_ERROR, message: error.message });

    return error.message;

  }

};


export const decreaseProductQuantity = (productId) => async (dispatch) => {

  try {

    const response = await axios.put(`${BASE_URL}/decrementProductQuantity`, { productId });

    dispatch({ type: DECRE_PRODUCT_QUANTITY_SUCCESS, payload: response?.data });

    return response;

  } catch (error) {

    dispatch({ type: DECRE_PRODUCT_QUANTITY_ERROR, message: error.message });

    return error.message;

  }

};