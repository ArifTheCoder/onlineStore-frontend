import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Product } from "../../models/products";
import ProductListItem from "./ProductListItem";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: 0,
    marginRight: 0,
    width: "100%",
  },
}));

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FunctionComponent<ProductListProps> = ({
  products,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} spacing={2}>
      {products.map((product) => (
        <ProductListItem key={product.pk} product={product} />
      ))}
    </Grid>
  );
};

ProductList.displayName = "ProductList";

export default ProductList;
