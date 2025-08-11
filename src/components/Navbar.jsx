import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import "../css/Navbar.css";

const Navbar = () => {
  const { cart } = useContext(ProductContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart?.reduce((sum, item) => sum + item.qty, 0) || 0;

  return (
    <nav className="navbar">
      {}
      <div className="nav-left">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          🛒 ShopEasy
        </Link>
      </div>

      {}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </div>

      {}
      <div className={`nav-right ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
        <Link to="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
          <FaShoppingCart size={20} />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
