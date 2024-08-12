import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import '../styles.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = productsData.products.map(product => ({
      ...product,
      quantity: 1
    }));
    setCartItems(items);
  }, []);

  const handleIncreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                {item.quantity}
                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"><strong>Total Quantity</strong></td>
            <td>{getTotalQuantity()}</td>
            <td><strong>${getTotalAmount()}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Cart;
