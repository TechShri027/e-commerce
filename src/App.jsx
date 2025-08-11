import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import { ProductProvider } from "./context/ProductContext";


import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} /> {}
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
