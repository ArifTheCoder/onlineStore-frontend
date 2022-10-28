import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { ProductForm } from "./form";
import { ProductFormValues } from "./form/ProductForm";
import axios from "axios";
import {
  ProductModel,
  serializeProductFormValuesForBackend,
} from "../../models/products";
import { SnackbarMessage } from "../common/snackbars";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
  },
}));

type ProductAddingViewState = {
  productAddingError: boolean;
};

const ProductAdding: React.FunctionComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [state, setState] = React.useState<ProductAddingViewState>({
    productAddingError: false,
  });

  const handleSubmit = (values: ProductFormValues) => {
    axios
      .post(ProductModel.getURL(), serializeProductFormValuesForBackend(values))
      .then(async (response) => {
        navigate(`/product-image/${response.data.id}`);
      })
      .catch(() =>
        setState({
          productAddingError: true,
        })
      );
  };

  return (
    <Container className={classes.container}>
      <Box mb={3}>
        <Typography variant="h4">Add a new product</Typography>
      </Box>
      <ProductForm handleSubmit={handleSubmit} />

      {state.productAddingError && (
        <SnackbarMessage
          isOpen={true}
          severity="error"
          text="Something went wrong, try again."
        />
      )}
    </Container>
  );
};

ProductAdding.displayName = "ProductAdding";

export default ProductAdding;
