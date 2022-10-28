import { Action } from "../actions/actions";
import { ActionType } from "../actions/types";
import { ProductSearchResultsState } from "../types";

export const initialState: Readonly<ProductSearchResultsState> = {
  products: undefined,
};

const reducer = (
  state: ProductSearchResultsState = initialState,
  action: Action
): ProductSearchResultsState => {
  switch (action.type) {
    case ActionType.ADD_SEARCHED_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
