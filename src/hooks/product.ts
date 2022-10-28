import {
  convertProductData,
  Product,
  ProductData,
  ProductModel,
} from "../models/products";
import axios, { AxiosError } from "axios";
import useSWR from "swr";

export const useProductList = (): [
  Product[] | undefined,
  AxiosError | undefined
] => {
  const { data, error } = useSWR<Product[] | undefined, AxiosError>(
    ["product-list"],
    () =>
      axios
        .get<ProductData[]>(ProductModel.getURL())
        .then((response) => response.data.map(convertProductData))
  );

  return [data, error];
};

export const useProduct = (
  productId: string
): [Product | undefined, AxiosError | undefined] => {
  const { data, error } = useSWR<Product | undefined, AxiosError>(
    ["product", productId],
    () =>
      axios
        .get<ProductData>(ProductModel.getInstanceURL(productId))
        .then((response) => convertProductData(response.data))
  );
  return [data, error];
};
