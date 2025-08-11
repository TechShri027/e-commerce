import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Loader from "../components/Loader";
import Error from "../components/Error";
import { ProductContext } from "../context/ProductContext";
import "../css/ProductDetails.css"; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { products, loading, error, addToCart, placeOrder } =
    useContext(ProductContext);

  if (loading) return <Loader />;
  if (error) return <Error />;

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p className="not-found">Product not found</p>;
  }

  return (
    <div className="product-details-container">
      <div className="product-card">
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <span className="product-category">{product.category}</span>
          <p className="product-price">₹{product.price}</p>
          <p className="product-description">{product.description}</p>

          {}
          <div className="product-actions">
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className="buy-now-btn"
              onClick={() => {
                placeOrder(product);
                navigate("/orders"); 
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
