import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { ProductForm } from "./form";
import { ProductFormValues } from "./form/ProductForm";
import axios from "axios";
import { useParams } from "react-router";
import {
  ProductModel,
  serializeProductFormValuesForBackend,
} from "../../models/products";
import { SnackbarMessage } from "../common/snackbars";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
  },
}));

type ProductEditingViewState = {
  productEditingError: boolean;
};

const ProductEditing: React.FunctionComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { productId } = useParams() as { productId: string };
  const [product] = useProduct(productId);
  const [state, setState] = React.useState<ProductEditingViewState>({
    productEditingError: false,
  });

  const handleSubmit = (values: ProductFormValues) => {
    axios
      .patch(
        ProductModel.getInstanceURL(product!.pk),
        serializeProductFormValuesForBackend(values)
      )
      .then(() => {
        navigate(`/product-image/${product?.pk}`);
      })
      .catch(() =>
        setState({
          productEditingError: true,
        })
      );
  };

  return (
    <Container className={classes.container}>
      <Box mb={3}>
        <Typography variant="h4">Edit the product: {product?.name}</Typography>
      </Box>

      <ProductForm product={product} handleSubmit={handleSubmit} />

      {state.productEditingError && (
        <SnackbarMessage
          isOpen={true}
          severity="error"
          text="Product editing failed, try again."
        />
      )}
    </Container>
  );
};

ProductEditing.displayName = "ProductEditing";

export default ProductEditing;
