import { convertProductData } from "./converters";

export const ProductModel = {
  convert: convertProductData,
  getURL: () => "/api/products/",
  getInstanceURL: (id: string) => `/api/products/${id}/`,
};
