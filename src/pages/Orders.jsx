import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import "../css/Orders.css";

const Orders = () => {
  const { orders } = useContext(ProductContext);

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Orders"
          className="empty-orders-icon"
        />
        <p>No orders yet</p>
        <span className="orders-empty-subtext">Start shopping and place your first order! 🛒</span>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2 className="orders-title">📦 Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <h4 className="order-id">Order #{order.id}</h4>
            <span className="order-date">
              {new Date(order.date || Date.now()).toLocaleDateString()}
            </span>
          </div>
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.title} className="order-item-image" />
                <div className="order-item-info">
                  <p className="order-item-title">{item.title}</p>
                  <p className="order-item-qty">
                    {item.qty} × ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-footer">
            <strong>
              Total: ₹
              {order.items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}
            </strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
