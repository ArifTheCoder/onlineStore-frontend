import { findIndex, multiply } from "lodash";
import { Product } from "../../models/products";
import { Action } from "../actions/actions";
import { ActionType } from "../actions/types";
import { ShoppingCartState } from "../types";

const isMatchingProduct = (a: Product, b: Product): boolean => a.pk === b.pk;

export const initialState: Readonly<ShoppingCartState> = {
  lines: [],
  totalPrice: undefined,
};

const reducer = (
  state: ShoppingCartState = initialState,
  action: Action
): ShoppingCartState => {
  switch (action.type) {
    case ActionType.ADD_PRODUCT:
      const indexInCart = findIndex(state.lines, (line) =>
        isMatchingProduct(line.product, action.payload.product)
      );
      const lines = [...state.lines];

      if (indexInCart !== -1) {
        const originalLine = lines[indexInCart];
        const { quantity, unitPrice } = originalLine;
        const newQuantity = Math.min(50, quantity + 1);

        lines[indexInCart] = {
          ...originalLine,
          totalPrice: unitPrice ? multiply(unitPrice, newQuantity) : undefined,
          quantity: newQuantity,
        };
      } else {
        const { product, unitPrice } = action.payload;

        lines.push({
          product,
          unitPrice,
          totalPrice: unitPrice,
          quantity: 1,
        });
      }

      let cartTotalPrice = 0;
      lines.forEach((line) => {
        if (line.unitPrice)
          cartTotalPrice += multiply(line.unitPrice, line.quantity);
      });

      return {
        ...state,
        lines,
        totalPrice: cartTotalPrice,
      };

    case ActionType.REMOVE_PRODUCT_LINE:
      let newLines = state.lines.filter(
        (item, index) => index !== action.payload
      );
      let cartNewTotalPrice = 0;
      newLines.forEach((line) => {
        if (line.unitPrice)
          cartNewTotalPrice += multiply(line.unitPrice, line.quantity);
      });

      return {
        ...state,
        lines: newLines,
        totalPrice: cartNewTotalPrice,
      };

    case ActionType.CHANGE_QUANTITY:
      return {
        ...state,
        lines: state.lines.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }

          return {
            ...item,
            quantity: action.payload.newQuantity,
          };
        }),
      };
    default:
      return state;
  }
};

export default reducer;
