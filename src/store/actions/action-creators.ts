import { Dispatch } from "redux";
import { Product } from "../../models/products";
import { Action } from "./actions";
import { ActionType } from "./types";

export const addProduct = (data: { product: Product; unitPrice?: number }) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_PRODUCT,
      payload: data,
    });
  };
};

export const changeQuantity = (data: {
  index: number;
  newQuantity: number;
}) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CHANGE_QUANTITY,
      payload: data,
    });
  };
};

export const removeProductLine = (data: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REMOVE_PRODUCT_LINE,
      payload: data,
    });
  };
};

export const addSearchedProducts = (data?: Product[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_SEARCHED_PRODUCTS,
      payload: data,
    });
  };
};
