// reducers/selectedProductsReducer.js
const initialState = {
    products: [],
  };
  
  const selectedProductsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_SELECTED_PRODUCT':
        return {
          ...state,
          products:  action.payload,
        };

      default:
        return state;
    }
  };
  
  
  export default selectedProductsReducer;
  