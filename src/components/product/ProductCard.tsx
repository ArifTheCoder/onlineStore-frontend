import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import React from "react";
import { Product } from "../../models/products";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    width: "100%",
    minHeight: theme.spacing(27.5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "relative",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
  },
  cardContent: {
    textAlign: "center",
    position: "relative",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    maxHeight: theme.spacing(28),
    maxWidth: "100%",
  },
  linkItem: {
    textDecoration: "none",
  },
}));

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FunctionComponent<ProductCardProps> = ({
  product,
}) => {
  const classes = useStyles();

  return (
    <Link className={classes.linkItem} to={`/product/${product.pk}`}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.imageWrapper}>
            <img className={classes.image} src={product.image} alt="" />
          </div>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Brand: {product.brandName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Price: {product.price}€
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
