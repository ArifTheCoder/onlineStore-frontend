import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { makeStyles } from "@mui/styles";
import React from "react";
import * as Yup from "yup";
import { Product } from "../../../models/products";
import FormFieldBox from "../../common/FormFieldBox";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: "red",
    fontSize: theme.spacing(1.75),
  },
}));

export type ProductFormOwnProps = {
  product?: Product;
  handleSubmit: (values: ProductFormValues) => void;
};

export type ProductFormValues = {
  name: string;
  brandName?: string;
  description?: string;
  price?: number;
  availableTotal?: number;
};

export type ProductFormSubmitData = {
  name: string;
  brand?: string;
  description?: string;
  price?: number;
  count_in_stock?: number;
};

const ProductForm: React.FunctionComponent<ProductFormOwnProps> = ({
  product,
  handleSubmit,
}) => {
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Product name too short!")
      .max(50, "Product name too Long!")
      .required("Product name should not be empty"),
  });

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validationSchema}
      initialValues={{
        name: product?.name ?? "",
        brandName: product?.brandName ?? "",
        description: product?.description ?? "",
        price: product?.price ?? 0,
        availableTotal: product?.availableTotal ?? 0,
      }}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values, errors, touched }) => (
        <Form>
          <FormFieldBox>
            <TextField
              id="name"
              name="name"
              value={values.name}
              label="Product name"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
            {errors.name && touched.name ? (
              <div>
                <span className={classes.errorMessage}>{errors.name}</span>
              </div>
            ) : null}
          </FormFieldBox>
          <FormFieldBox>
            <TextField
              id="brandName"
              name="brandName"
              value={values.brandName}
              label="Name of the brand"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </FormFieldBox>
          <FormFieldBox>
            <TextField
              id="price"
              name="price"
              value={values.price}
              type="number"
              label="Price"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </FormFieldBox>
          <FormFieldBox>
            <TextField
              id="availableTotal"
              name="availableTotal"
              value={values.availableTotal}
              type="number"
              label="Total in stock"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </FormFieldBox>
          <FormFieldBox>
            <TextField
              id="description"
              name="description"
              value={values.description}
              label="Product description"
              variant="outlined"
              multiline
              fullWidth
              onChange={handleChange}
            />
          </FormFieldBox>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

ProductForm.displayName = "ProductForm";

export default ProductForm;
