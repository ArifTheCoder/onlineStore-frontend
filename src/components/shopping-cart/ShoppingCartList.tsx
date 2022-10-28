import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import ShoppingCartListItem from "./ShoppingCartListItem";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
  },
  paperContainer: {
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  gridContainer: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

const ShoppingCartList: React.FunctionComponent = () => {
  const classes = useStyles();
  const shoppingCart = useSelector((state: RootState) => state.cart);

  return (
    <Container className={classes.container}>
      <Box mb={3}>
        {shoppingCart.lines.length === 0 ? (
          <Typography variant="h4">Your shopping cart is empty.</Typography>
        ) : (
          <Typography variant="h4">Your shopping cart</Typography>
        )}
      </Box>

      <Paper className={classes.paperContainer}>
        <Grid className={classes.gridContainer}>
          {shoppingCart.lines.map((line, index) => (
            <ShoppingCartListItem key={index} line={line} index={index} />
          ))}
        </Grid>
      </Paper>

      {shoppingCart.lines.length !== 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={3}
          mb={3}
        >
          <Typography color="primary" variant="h6">
            Total price: {shoppingCart.totalPrice} €
          </Typography>
        </Box>
      )}
    </Container>
  );
};

ShoppingCartList.displayName = "ShoppingCartList";

export default ShoppingCartList;
