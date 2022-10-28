import { Container, Skeleton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useProductList } from "../hooks";
import { SnackbarMessage } from "./common/snackbars";
import { ProductList } from "./product";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
  },
}));

const HomeView: React.FunctionComponent = () => {
  const classes = useStyles();
  const [products, productFetchingError] = useProductList();
  const searchedProducts = useSelector(
    (state: RootState) => state.searchedProducts.products
  );

  return (
    <Container className={classes.container}>
      {/* If products and productFetchingError is undefined, means the system has not fetched the product yet. */}
      {!products && !productFetchingError && (
        <Skeleton width="100%" height="50%" />
      )}

      {/* If the products[] is empty, means the web store has no product yet. */}
      {products?.length === 0 && (
        <Typography>The web store has no product yet, please add.</Typography>
      )}

      {/* Display the product list if there is product avaiable. */}
      {products?.length && (
        <ProductList
          products={searchedProducts?.length ? searchedProducts : products}
        />
      )}

      {/* If there is productFetchingError then display an error message. */}
      {productFetchingError && (
        <SnackbarMessage
          isOpen
          severity="error"
          text={"Failed to import the list of products from server, try again."}
        />
      )}
    </Container>
  );
};

HomeView.displayName = "HomeView";

export default HomeView;
