import {
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,

  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_ERROR,

  ADD_TO_PRODUCT_CART_SUCCESS,
  ADD_TO_PRODUCT_CART_ERROR,

  INCRE_PRODUCT_QUANTITY_SUCCESS,
  INCRE_PRODUCT_QUANTITY_ERROR,

  DECRE_PRODUCT_QUANTITY_SUCCESS,
  DECRE_PRODUCT_QUANTITY_ERROR

} from "../action/productAction";

const initial = {

  Product: [],

  cart: [],

  error: null,

  TotalPrice: 0,

};

const ProductReducer = (state = initial, action) => {

  switch (action.type) {

    case CREATE_PRODUCT_SUCCESS:

      return {
        ...state,
        Product: action.payload,
        error: null
      };

    case CREATE_PRODUCT_ERROR:

      return {
        ...state,
        error: action.message
      };


    case GET_ALL_PRODUCT_SUCCESS:

      return {
        ...state,
        Product: action.payload,
        error: null
      };

    case GET_ALL_PRODUCT_ERROR:

      return {
        ...state,
        error: action.message
      };


    case ADD_TO_PRODUCT_CART_SUCCESS:

      let updateCart = [];
      let productAlreadyExit = false;
      let addTotalPrice = state.TotalPrice;

      if (state.cart.length > 0) {

        updateCart = state.cart?.map((item) => {

          if (item._id === action.payload._id) {

            productAlreadyExit = true;

            const addProCart = { ...item, ProductQuantity: item.ProductQuantity + 1 };

            addTotalPrice += addProCart.ProductPrice;

            return addProCart;
          }

          return item;
        });
      }

      if (!productAlreadyExit) {

        updateCart = [...state.cart, action.payload];

        // addTotalPrice += action.payload.ProductPrice;
        addTotalPrice += action.payload.ProductQuantity * action.payload.ProductPrice;
      }

      return {

        ...state,

        cart: updateCart,

        TotalPrice: addTotalPrice,

        error: null,
      };

    case ADD_TO_PRODUCT_CART_ERROR:

      return {
        ...state,
        error: action.message
      };


    case INCRE_PRODUCT_QUANTITY_SUCCESS:

      // for Product quantity...

      // return {

      //   ...state,

      //   Product: state.Product?.productData?.map((product) => {

      //     return product._id === action.payload._id

      //       ? { ...product, ProductQuantity: product.ProductQuantity + 1 }

      //       : product
      //   }),

      //   error: null
      // };

      let increCartQuantity = [];
      let updatedTotalPrice = state.TotalPrice;

      if (state.cart.length > 0) {

        increCartQuantity = state.cart?.map((item) => {

          if (item._id === action.payload._id) {

            // return { ...item, ProductQuantity: item.ProductQuantity + 1 };
            const updatedCartItem = { ...item, ProductQuantity: item.ProductQuantity + 1 };

            updatedTotalPrice += updatedCartItem.ProductPrice;

            return updatedCartItem;
          }

          return item;
        });
      }

      return {

        ...state,

        cart: increCartQuantity,

        TotalPrice: updatedTotalPrice,

        error: null
      };

    case INCRE_PRODUCT_QUANTITY_ERROR:

      return {
        ...state,
        error: action.message
      };


    case DECRE_PRODUCT_QUANTITY_SUCCESS:

      // return {
      //   ...state,

      //   Product: state.Product?.productData?.map((product) => {

      //     return product._id === action.payload._id

      //       ? { ...product, ProductQuantity: Math.max(0, product.ProductQuantity - 1) }

      //       : product
      //   }),

      //   error: null
      // };


      let decreCartQuantity = [];
      let updateTotalPrice = state.TotalPrice;

      if (state.cart.length > 0) {

        decreCartQuantity = state.cart?.map((item) => {

          if (item._id === action.payload._id) {

            const updateProCart = { ...item, ProductQuantity: item.ProductQuantity - 1 };

            updateTotalPrice -= updateProCart.ProductPrice;

            return updateProCart;
          }

          return item;
        });
      }

      return {

        ...state,

        cart: decreCartQuantity,

        TotalPrice: updateTotalPrice,

        error: null
      };

    case DECRE_PRODUCT_QUANTITY_ERROR:

      return {
        ...state,
        error: action.message
      };

    default:
      return state;

  }
};

export default ProductReducer;