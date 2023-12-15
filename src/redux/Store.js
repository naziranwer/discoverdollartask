import { createStore, combineReducers } from "redux";
import selectedProductsReducer from "./Reducers";

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  selectedProducts: selectedProductsReducer,
  // Add other reducers if needed
});

// Create Redux store
const store = createStore(rootReducer);

export default store;
