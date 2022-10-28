import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React from "react";
import axios from "axios";
import { SnackbarMessage } from "../common/snackbars";
import { useParams } from "react-router";
import { useProduct } from "../../hooks";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
  },
  verticalMargin: {
    margin: theme.spacing(1, 0),
  },
  dialogHelperText: {
    padding: theme.spacing(1, 0),
    color: theme.palette.text.secondary,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(3),
    top: theme.spacing(3),
  },
  dialogActions: {
    padding: theme.spacing(1, 3),
    justifyContent: "space-between",
  },
}));

const ProductImageAdding: React.FunctionComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { productId } = useParams() as { productId: string };
  const [product] = useProduct(productId);
  const [file, setFile] = React.useState<Blob>();
  const [fileUploadModalOpen, setFileUploadModalOpen] = React.useState(false);
  const [imageUploadError, setImageUploadError] = React.useState(undefined);

  const openModal = () => {
    setFileUploadModalOpen(true);
  };

  const closeModal = () => {
    setFileUploadModalOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const uploadImage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setFileUploadModalOpen(false);

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      axios
        .post(`/api/product-image/${product?.pk}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(async () => {
          navigate("/");
        })
        .catch((error) => setImageUploadError(error));
    }
  };

  return (
    <Container className={classes.container}>
      {product && (
        <Box mb={3}>
          <Typography variant="h4">
            Upload new image for the product: {product.name}
          </Typography>
        </Box>
      )}

      <Button
        className={classes.verticalMargin}
        type="submit"
        disableElevation={true}
        color="primary"
        variant="contained"
        startIcon={<FileUploadOutlinedIcon />}
        onClick={openModal}
      >
        Upload image
      </Button>

      <Dialog open={fileUploadModalOpen}>
        <DialogTitle id="image-upload-dialog-title">
          Upload image for your product
          <IconButton className={classes.closeButton} onClick={closeModal}>
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Input
            type="file"
            id="image-upload-file-input"
            onChange={handleChange}
          />
          <Typography className={classes.dialogHelperText} component="p">
            The uploaded image must be either .jpg or .png file.
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            fullWidth
            type="button"
            disableElevation={true}
            color="primary"
            variant="outlined"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            type="submit"
            disableElevation={true}
            color="primary"
            variant="contained"
            onClick={uploadImage}
          >
            Upload image
          </Button>
        </DialogActions>
      </Dialog>

      {imageUploadError && (
        <SnackbarMessage
          isOpen={true}
          severity="error"
          text="Something went wrong, try again."
        />
      )}
    </Container>
  );
};

ProductImageAdding.displayName = "ProductImageAdding";

export default ProductImageAdding;
