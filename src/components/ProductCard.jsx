import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import "../css/ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart, placeOrder } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    addToCart(product);
    placeOrder();
    navigate("/orders");
  };

  return (
    <div className="product-card enhanced">
      {}
      <Link to={`/product/${product.id}`} className="card-link">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <span className="product-category-tag">{product.category}</span>
        </div>

        {}
        <div className="product-info">
          <h3 className="product-title" title={product.title}>
            {product.title.length > 40
              ? product.title.slice(0, 40) + "..."
              : product.title}
          </h3>
          <p className="product-price">₹{product.price}</p>
          <p className="product-description">
            {product.description.length > 60
              ? product.description.slice(0, 60) + "..."
              : product.description}
          </p>
        </div>
      </Link>

      {}
      <div className="product-actions">
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          🛒 Add to Cart
        </button>
        <button className="buy-now-btn" onClick={handleBuyNow}>
          ⚡ Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
