import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Product } from "../../models/products";
import ProductCard from "./ProductCard";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    width: "100%",
    marginBottom: theme.spacing(0.5),
  },
}));

type ProductListItemProps = {
  product: Product;
};

const ProductListItem: React.FunctionComponent<ProductListItemProps> = ({
  product,
}) => {
  const classes = useStyles();

  return (
    <Grid
      key={product.pk}
      item
      className={classes.container}
      xs={6}
      sm={6}
      md={4}
      lg={3}
    >
      <ProductCard product={product} />
    </Grid>
  );
};

ProductListItem.displayName = "ProductListItem";

export default ProductListItem;
