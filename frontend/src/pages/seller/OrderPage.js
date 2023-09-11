import React from 'react'
import "../../css/admin/admin.css";
import SellerSidebar from '../../components/SellerSidebar';
import menu from '../../img/menu.png';
import admin from '../../img/admin.png';
import { useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';

export async function loaderForOrderManagement() {
  const [orders, products, cartItems] = await Promise.all([
    fetch("http://localhost:8080/api/order/getallorder").then((response) => response.json()),
    fetch("http://localhost:8080/api/product/getallproduct").then((response) => response.json()),
    fetch("http://localhost:8080/api/cartitem/getallcartitem").then((response) => response.json()),
  ]);
  return { orders, products, cartItems };
}

export default function OrderPage() {

  const options = ['shipped', 'canceled'];
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/user/sellerData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserName(data.data.name);
        setUserId(data.data._id);
      })
      .catch((error) => console.log(error));
  }, []);

  const { orders, products, cartItems } = useLoaderData();
  const data = orders.data && orders.data.map((order, index) =>
    <React.Fragment key={index + 1}>
      <tr>
        <td>{index + 1}</td>
        <td>Order #{index + 1}</td>
        <td>
          {order.cartItems.map((item) =>
            <tr>
              <td>
                Item's name: {cartItems.data.map((cartItem) => (products.data.map((product) => (product.seller === userId && product._id === cartItem.product && cartItem._id === item) ? product.name : "")))}
              </td>
              <td>
                Quantity: {cartItems.data.map((cartItem) => (cartItem._id === item) ? cartItem.quantity : "")}
              </td>
              <td>
                Status: <span className={`status ${cartItems.data.filter((cartItem) => cartItem._id === item).map((result) => result.status)}`}></span>
                {cartItems.data.map((cartItem) => (cartItem._id === item) ? cartItem.status : "")}
              </td>
              <td>
                <select onChange={(e) => handleStatusChange(`${cartItems.data.filter((cartItem) => cartItem._id === item).map((result) => result._id)}`, e.target.value)}>
                  <option selected>--Status--</option>
                  {options.map((option, index) =>
                    <option key={index + 1} >
                      {option}
                    </option>
                  )}
                </select>
              </td>
            </tr>
          )}
        </td>
        <td></td>
      </tr>
    </React.Fragment>
  );

  function logOut() {
    window.localStorage.clear();
    window.location.href = "./signin";
  };

  function handleStatusChange(cartItemID, newStatus) {
    fetch(`http://localhost:8080/api/cartitem/updatecartitem/${cartItemID}`, {
      method: "PATCH",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: cartItemID,
        newStatus: newStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          window.location.href = "./order";
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="admin-container">
        <SellerSidebar />
        <div className="main-content">
          <header>
            <div className="box">
              <img src={menu} alt="Menu" />
              <span>Orders Management</span>
            </div>

            <div className="user-wrapper">
              <button onClick={() => logOut()}>Log out</button>
              <img src={admin} width="30px" height="30px" alt="Admin" />
              <div>
                <h4>Welcome,</h4>
                <small>{userName} !</small>
              </div>
            </div>
          </header>

          <main>
            <div className="sellers-management">
              <div className="accounts">
                <div className="card">
                  <div className="card-header">
                    <h2>Orders Management</h2>
                  </div>

                  <div className="card-body">
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Details</td>
                          </tr>
                        </thead>
                        <tbody>
                          {data}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}