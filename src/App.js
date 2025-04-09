import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import TanstackTable from "./components/TanstackTable/tanstackTable";
import DynamicTanstack from "./components/TanstackTable/dynamicTanstack";
import StaticTanstackTable from "./components/TanstackTable/staticTable";

function App() {
  const [cart, setCart] = useState([]); // Cart state

  // Function to add a product to the cart
  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      // If the product is already in the cart, increase its quantity
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <Header cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route
          path="/static-tanstack-table"
          element={<StaticTanstackTable />}
        />
        <Route path="/dynamic-tanstack-table" element={<DynamicTanstack />} />

        <Route path="/tanstack-table" element={<TanstackTable />} />
        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={removeFromCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
