import { Box, Button, Container, Skeleton, Typography } from "@mui/material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import EuroSymbolOutlinedIcon from "@mui/icons-material/EuroSymbolOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useParams } from "react-router";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useProduct } from "../../hooks";
import { SnackbarMessage } from "../common/snackbars";
import { makeStyles } from "@mui/styles";
import { actionCreators } from "../../store";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "../../models/products";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
  },
  productProperty: {
    marginRight: theme.spacing(0.5),
  },
  image: {
    maxWidth: 300,
    maxHeight: 300,
  },
}));

type ProductDetailsViewState = {
  productDeletingError: boolean;
};

const ProductDetails: React.FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = React.useState<ProductDetailsViewState>({
    productDeletingError: false,
  });
  const { productId } = useParams() as { productId: string };
  const [product, productFetchingError] = useProduct(productId);
  const { addProduct } = bindActionCreators(actionCreators, dispatch);

  // Add product to shopping cart.
  const handleClick = () => {
    if (product) {
      const unitPrice = product.price;
      addProduct({ product, unitPrice });
    }
  };

  const handleDelete = () => {
    axios
      .delete(ProductModel.getInstanceURL(product!.pk))
      .then(() => navigate("/"))
      .catch(() =>
        setState({
          productDeletingError: true,
        })
      );
  };

  return (
    <Container className={classes.container}>
      {!product && !productFetchingError && (
        <Skeleton width="100%" height="50%" />
      )}

      {product && (
        <>
          <Box display="flex" justifyContent="flex-end" width="100%" mb={3}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Add to shopping cart
            </Button>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box display="flex" flexDirection="column" width="50%">
              <Typography variant="h5">{product.name}</Typography>

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                width="100%"
                mt={3}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CategoryOutlinedIcon
                    className={classes.productProperty}
                    fontSize="small"
                    color="disabled"
                  />
                  <Typography variant="caption" color="textSecondary">
                    {product.brandName}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <EuroSymbolOutlinedIcon
                    className={classes.productProperty}
                    fontSize="small"
                    color="disabled"
                  />
                  <Typography variant="caption" color="textSecondary">
                    {product.price}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Inventory2OutlinedIcon
                    className={classes.productProperty}
                    fontSize="small"
                    color="disabled"
                  />
                  <Typography variant="caption" color="textSecondary">
                    {product.availableTotal}
                  </Typography>
                </Box>
              </Box>
              <Box mt={2}>
                <Typography variant="h6">Product information</Typography>
                <Typography variant="body1" color="textSecondary">
                  {product.description}
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="50%"
            >
              <img className={classes.image} src={product.image} alt="" />
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            width="100%"
            mt={5}
          >
            <Button
              style={{ width: "95px", marginRight: "16px" }}
              variant="contained"
              color="primary"
              onClick={() => navigate(`/product-editing/${product.pk}`)}
            >
              Edit
            </Button>
            <Button
              style={{ width: "95px" }}
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </>
      )}

      {productFetchingError && (
        <SnackbarMessage
          isOpen
          severity="error"
          text={"Failed to import product from server, try again."}
        />
      )}

      {state.productDeletingError && (
        <SnackbarMessage
          isOpen
          severity="error"
          text={"Failed to delete product, try again."}
        />
      )}
    </Container>
  );
};

ProductDetails.displayName = "ProductDetails";

export default ProductDetails;
