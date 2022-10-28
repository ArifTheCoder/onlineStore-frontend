/**
 * Representation of product.
 */
export type Product = {
  /** Unique identifier of product. */
  pk: string;
  /** Name of the product item. */
  name: string;
  /** Brand name of the item. */
  brandName?: string;
  /** Price of the product. */
  price?: number;
  /** Description of the product. */
  description?: string;
  /** Product availability in number. */
  availableTotal?: number;
  /** Image link of the product */
  image?: string;
};

/**
 * Representation of product data received from the API.
 */
export type ProductData = {
  /** Unique identifier of product. */
  id: string;
  /** Name of the product item. */
  name: string;
  /** Brand name of the item. */
  brand?: string;
  /** Price of the product. */
  price?: number;
  /** Description of the product. */
  description?: string;
  /** Product availability in number. */
  count_in_stock?: number;
  /** Image link of the product */
  image?: string;
};
