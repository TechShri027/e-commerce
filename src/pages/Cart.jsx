import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import "../css/Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, placeOrder } = useContext(ProductContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    placeOrder();
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="cart-empty-icon"
        />
        <h3>Your cart is empty</h3>
        <p>Looks like you haven’t added anything yet. Start shopping now!</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">🛒 Your Shopping Cart</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-info">
              <h4 className="cart-item-title">{item.title}</h4>
              <p className="cart-item-price">₹{item.price} × {item.qty}</p>
              <p className="cart-item-total">Total: ₹{(item.price * item.qty).toFixed(2)}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ❌ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Grand Total: <span>₹{totalPrice.toFixed(2)}</span></h3>
        <div className="cart-actions">
          <button className="clear-cart-btn" onClick={clearCart}>
            🗑 Clear Cart
          </button>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            ✅ Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
