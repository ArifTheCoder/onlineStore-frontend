import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { RootState } from "../../store/reducers";
import {
  convertProductData,
  ProductData,
  ProductModel,
} from "../../models/products";
import { actionCreators } from "../../store";

const useStyles = makeStyles((theme) => ({
  menuLink: {
    padding: 0,
    marginLeft: theme.spacing(0.5),
    fontSize: theme.spacing(1.75),
  },
  linkText: {
    marginLeft: theme.spacing(1),
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const TopNavigation: React.FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const { addSearchedProducts } = bindActionCreators(actionCreators, dispatch);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const shoppingCartState = useSelector((state: RootState) => state.cart);
  const totalItemsInShoppingCart = shoppingCartState.lines
    .map((item) => item.quantity)
    .reduce((a: number, b: number) => a + b, 0);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProductSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    axios
      .get<ProductData[]>(ProductModel.getURL(), {
        params: { search: event.target.value },
      })
      .then(async (response) =>
        addSearchedProducts(response.data.map(convertProductData))
      )
      .catch(() => console.log("Error"));
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Add Product</MenuItem>
      <MenuItem onClick={handleMenuClose}>Shopping cart</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => navigate("/product-add")}>
        <AddCircleOutlineOutlinedIcon fontSize="small" />

        <p className={classes.linkText}>Add Product</p>
      </MenuItem>
      <MenuItem onClick={() => navigate("/shopping-cart")}>
        <Badge
          badgeContent={totalItemsInShoppingCart}
          color="error"
          overlap="circular"
        >
          <ShoppingCartOutlinedIcon fontSize="small" />
        </Badge>

        <p className={classes.linkText}>Shopping cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            Super store
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Product search"
              inputProps={{ "aria-label": "search" }}
              onChange={handleProductSearch}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mr={2}
            >
              <IconButton
                size="small"
                aria-label="add product"
                color="inherit"
                onClick={() => navigate("/product-add")}
              >
                <AddCircleOutlineOutlinedIcon fontSize="small" />
                <span className={classes.menuLink}>Add Product</span>
              </IconButton>
            </Box>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => navigate("/shopping-cart")}
            >
              <Badge
                badgeContent={totalItemsInShoppingCart}
                color="error"
                overlap="circular"
              >
                <ShoppingCartOutlinedIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

TopNavigation.displayName = "TopNavigation";

export default TopNavigation;
