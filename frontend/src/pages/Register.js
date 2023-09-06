import React from 'react'
// import Header from '../components/Header'
import "../css/register.css";
import { useState } from 'react';
// import Radio from "../components/Radio.js";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/user/register",{
      method:"POST",
      crossDomain: true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      {/* <Header /> */}
      <div className="container">
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
              <input type="text" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          {/* <div className="user-type">
            <input type="radio" name="type" id="dot-1" value="seller"/>
            <input type="radio" name="type" id="dot-2" value="customer"/>
            <span className="user-type-title">User Type</span>
            <div className="category">
              <label for="dot-1">
                <span className="dot one"></span>
                <span className="type">Seller</span>
              </label>
              <label for="dot-2">
                <span className="dot two"></span>
                <span className="type">Customer</span>
              </label>
            </div>
          </div> */}
          {/* <Radio/> */}
          <div className="button">
            <input type="submit" value="Register" onClick={(e) => HandleSubmit(e)} />
          </div>
        </form>
      </div>
    </>
  )
}