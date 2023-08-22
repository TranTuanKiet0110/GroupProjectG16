import React from 'react'
// import Header from '../components/Header'
import "../register.css";
import Radio from "../components/Radio.js"

export default function Register() {
  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <div className="title">Registration</div>
        <form action="#">
          <div className="user-details">
            <div className="input-field">
              <span className="details">Email</span>
              <input type="text" placeholder="Enter your email" required />
            </div>
            <div className="input-field">
              <span className="details">Phone Number</span>
              <input type="text" placeholder="Enter your number" required />
            </div>
            <div className="input-field">
              <span className="details">Password</span>
              <input type="text" placeholder="Enter your password" required />
            </div>
            <div className="input-field">
              <span className="details">Confirm Password</span>
              <input type="text" placeholder="Re-enter your password" required />
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
          <Radio/>
          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </>
  )
}