import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ShoppingCartLine } from "../../models/shopping-cart";
import { actionCreators } from "../../store";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
  },
  gridContainer: {
    borderBottomColor: theme.palette.divider,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    padding: theme.spacing(2),
  },
  image: {
    display: "block",
    height: "auto",
    marginLeft: 0,
    maxHeight: 90,
    maxWidth: "100%",
    width: "auto",
  },
  removeButtonRoot: {
    minHeight: "auto",
    padding: 0,
  },
  removeButtonText: {
    fontSize: "14px",
    padding: 0,
    justifyContent: "flex-start",
    color: theme.palette.error.dark,
  },
  priceColumn: {
    color: theme.palette.grey["600"],
    textAlign: "right",
  },
  priceRow: {
    paddingTop: theme.spacing(1),
  },
  productName: {
    fontWeight: "bold",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  },
  quantitySelect: {
    maxWidth: "75px",
  },
}));

type ShoppingCartListItemOwnProps = {
  line?: ShoppingCartLine;
  index?: number;
};

const ShoppingCartListItem: React.FunctionComponent<
  ShoppingCartListItemOwnProps
> = ({ line, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { removeProductLine } = bindActionCreators(actionCreators, dispatch);

  const handleProductRemove = () => {
    if (index !== undefined) {
      removeProductLine(index);
    }
  };

  return (
    <Grid item container direction="column" className={classes.gridContainer}>
      <Grid item container direction="row" alignItems="flex-start" spacing={1}>
        <Grid item xs={3}>
          <img src={line?.product.image} className={classes.image} alt="" />
        </Grid>
        <Grid item xs={6}>
          <Typography>Name: {line?.product.name}</Typography>
          <Typography>Brand: {line?.product.brandName}</Typography>
          <Typography>Unit price: {line?.unitPrice} €</Typography>
          <Typography>Quantity: {line?.quantity}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="text"
            fullWidth={true}
            classes={{
              root: classes.removeButtonRoot,
              text: classes.removeButtonText,
            }}
            onClick={handleProductRemove}
          >
            Remove
          </Button>
        </Grid>
      </Grid>
      <Grid item container direction="row" className={classes.priceRow}>
        <Grid item xs={6} className={classes.priceColumn}>
          <Typography component="span" variant="body2">
            Price: {line?.totalPrice} €
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

ShoppingCartListItem.displayName = "ShoppingCartListItem";

export default ShoppingCartListItem;
