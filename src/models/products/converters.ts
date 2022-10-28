import {
  ProductFormSubmitData,
  ProductFormValues,
} from "../../components/product/form/ProductForm";
import { Product, ProductData } from "./types";

/**
 * Converts product data coming from the API into Product instance.
 */
export const convertProductData = (payload: ProductData): Product => ({
  pk: payload.id,
  name: payload.name,
  brandName: payload.brand,
  price: payload.price,
  description: payload.description,
  availableTotal: payload.count_in_stock,
  image: payload.image,
});

/**
 * Converts the product form values to the format used in the API
 *
 * @param formValues ProductForm values.
 */
export function serializeProductFormValuesForBackend(
  formValues: ProductFormValues
): ProductFormSubmitData {
  return {
    name: formValues.name,
    brand: formValues.brandName,
    description: formValues.description,
    price: formValues.price,
    count_in_stock: formValues.availableTotal,
  };
}
