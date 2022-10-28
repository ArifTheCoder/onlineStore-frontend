import { ShoppingCart } from "../models/shopping-cart";
import { AnyAction, Store } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Product } from "../models/products";

/**
 * Redux state for storing contents of the shopping cart.
 */
export type ShoppingCartState = ShoppingCart;

/**
 * Redux state for storing product search results.
 */
export type ProductSearchResultsState = {
  products: Product[] | undefined;
};

/**
 * Redux state type definition for frontend application.
 */
export type FrontEndAppState = {
  shoppingCart: ShoppingCartState;
  productSearchResults: ProductSearchResultsState;
};

export type FrontEndAppDispatch = ThunkDispatch<
  FrontEndAppState,
  void,
  AnyAction
>;

export type FrontEndAppStore = Store<FrontEndAppState, AnyAction>;
