
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import ProductPage from "@/pages/ProductPage";
import NotFound from "@/pages/NotFound";
import { CartProvider } from "@/context/CartContext";
import Checkout from "@/pages/Checkout";
import ConnectPage from "@/pages/ConnectPage";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
