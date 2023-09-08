import React from 'react'
// import Header from '../components/Header'
import "../css/register.css";
import { useState } from 'react';

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("seller");

  const radioHandler = (e) => {
    setSelected(e.target.value);
    setBusinessName("");
    setAddress("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        password: password,
        businessName: businessName,
        address: address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* <Header /> */}
      <div className="register-main">
        <div className="register-container">
          <div className="title">Registration</div>
          <form>
            <div className="user-details">
              <div className="input-field">
                <span className="details">Name</span>
                <input type="text" placeholder="Enter your name" required onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="input-field">
                <span className="details">Email</span>
                <input type="text" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-field">
                <span className="details">Phone Number</span>
                <input type="text" placeholder="Enter your number" required onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="input-field">
                <span className="details">Password</span>
                <input type="text" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className="user-type">
              <input type="radio" name="type" id="dot-1" value="seller" checked={selected === "seller"} onChange={radioHandler} />
              <input type="radio" name="type" id="dot-2" value="customer" checked={selected === "customer"} onChange={radioHandler} />
              <input type="radio" name="type" id="dot-3" value="admin" checked={selected === "admin"} onChange={radioHandler} />
              <span className="user-type-title">User Type</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one"></span>
                  <span className="type">Seller</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two"></span>
                  <span className="type">Customer</span>
                </label>
                <label htmlFor="dot-3">
                  <span className="dot three"></span>
                  <span className="type">Admin</span>
                </label>
              </div>
            </div>
            <div className="form-extension">
              <div aria-hidden={selected !== "seller" ? true : false}>
                <div className="input-field">
                  <span className="details">Business Name</span>
                  <input type="text" placeholder="Enter your business name" required onChange={(e) => setBusinessName(e.target.value)} />
                </div>
              </div>
              <div aria-hidden={selected !== "customer" ? true : false}>
                <div className="input-field">
                  <span className="details">Address</span>
                  <input type="text" placeholder="Enter your address" required onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Register" onClick={(e) => handleSubmit(e)} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}