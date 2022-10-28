import { Product } from "../../models/products";
import { ActionType } from "./types";

interface AddProductAction {
  type: ActionType.ADD_PRODUCT;
  payload: {
    product: Product;
    unitPrice?: number;
  };
}

interface ChangeQuantityAction {
  type: ActionType.CHANGE_QUANTITY;
  payload: {
    index: number;
    newQuantity: number;
  };
}

interface RemoveProductLineAction {
  type: ActionType.REMOVE_PRODUCT_LINE;
  payload: number;
}

interface AddSearchedProductsAction {
  type: ActionType.ADD_SEARCHED_PRODUCTS;
  payload: Product[] | undefined;
}

export type Action =
  | AddProductAction
  | ChangeQuantityAction
  | RemoveProductLineAction
  | AddSearchedProductsAction;
