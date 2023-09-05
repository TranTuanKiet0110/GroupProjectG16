import React, { useState } from 'react';
import ordersData from '../api/orderproduct';
import sellerData from '../api/sellerdata';

function OrderPage() {
    const [updatedOrders, setUpdatedOrders] = useState([...ordersData]);

  // Function to handle status change for a product in an order
  const handleStatusChange = (orderIndex, newStatus) => {
    const updatedOrdersCopy = [...updatedOrders];
    updatedOrdersCopy[orderIndex].status = newStatus;
    setUpdatedOrders(updatedOrdersCopy);
  };
    // Function to filter ordersData based on productId from sellerData
  const filteredOrders = sellerData.map(seller => {
    const sellerProducts = seller.products;
    const filteredOrders = ordersData.filter(order => sellerProducts.includes(order.product));
    return { sellerName: seller.name, orders: filteredOrders };
  });

  return (
    <div>
      {filteredOrders.map((seller, index) => (
        <div key={index}>
          <h2>{seller.sellerName}'s Orders:</h2>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Customer ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {seller.orders.map((order, orderIndex) => (
                <tr key={orderIndex}>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.customer}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(orderIndex, e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
  }
  
  export default OrderPage;