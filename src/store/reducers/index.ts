import { combineReducers } from "redux";
import shoppingCartReducer from "./shopping-cart";
import productSearchedResultsReducer from "./searched-products";

const reducers = combineReducers({
  cart: shoppingCartReducer,
  searchedProducts: productSearchedResultsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
