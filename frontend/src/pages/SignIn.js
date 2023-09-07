import React from 'react'
// import Header from '../components/Header'
import "../css/signIn.css";
import { useState } from 'react';

export default function SignIn() {

    const [selected, setSelected] = useState("email");

    const dropdownHandler = e => {
        setSelected(e.target.value);
    };

    return (
        <>
            {/* <Header /> */}
            <div className="container">
                <div className="title">Sign In</div>
                <form>
                    <div className="user-type">
                        <span className="user-type-title">Select way to sign in</span>
                        <div className="category">
                            <select className="dropdown" onChange={dropdownHandler}>
                                <option value="email" selected={selected === "email"}>Email</option>
                                <option value="phone" selected={selected === "phone"}>Phone</option>
                            </select>
                        </div>
                    </div>
                    <div className="user-details">
                        <div className="input-field" aria-hidden={selected !== "email" ? true : false}>
                            <span className="details">Email</span>
                            <input type="text" placeholder="Your email" required/>
                        </div>
                        <div className="input-field" aria-hidden={selected !== "phone" ? true : false}>
                            <span className="details">Phone</span>
                            <input type="text" placeholder="Your phone number" required/>
                        </div>
                        <div className="input-field">
                            <span className="details">Password</span>
                            <input type="text" placeholder="Your password" required/>
                        </div>
                    </div>
                    
                    <div className="button">
                        <input type="submit" value="Log In"/>
                    </div>
                </form>
            </div>
        </>
    )
}