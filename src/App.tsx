import { Container } from "@mui/material";
import React from "react";
import { HomeView } from "./components";
import { Route, Routes } from "react-router-dom";
import { TopNavigation } from "./components/navigation";
import {
  ProductAdding,
  ProductDetails,
  ProductEditing,
  ProductImageAdding,
} from "./components/product";
import { ShoppingCartList } from "./components/shopping-cart";

const App: React.FunctionComponent = () => {
  return (
    <>
      <TopNavigation />
      <Container>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/product-add" element={<ProductAdding />} />
          <Route
            path="/product-image/:productId"
            element={<ProductImageAdding />}
          />
          <Route
            path="/product-editing/:productId"
            element={<ProductEditing />}
          />
          <Route path="/shopping-cart" element={<ShoppingCartList />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
