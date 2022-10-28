import { Product } from "../products";

/**
 * Representation of a single product line in a shopping cart.
 */
export type ShoppingCartLine = {
  /** The product to be purchased. */
  product: Product;
  /** Unit price of the line. */
  unitPrice?: number;
  /** Optional total price of the line. */
  totalPrice?: number;
  /** The amount of products to be purchased. */
  quantity: number;
};

/**
 * Representation of an shopping cart.
 */
export type ShoppingCart = {
  /** Container for lines in the shopping cart. */
  lines: ShoppingCartLine[];
  /** Total price of the products in shopping cart */
  totalPrice?: number;
};
