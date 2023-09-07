import React from 'react'
// import Header from '../components/Header'
import "../css/signIn.css";
import { useState } from 'react';

export default function SignIn() {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [selected, setSelected] = useState("email");

    const dropdownHandler = e => {
        setSelected(e.target.value);
        setEmail("");
        setPhone("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/user/signin", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email: email,
                // phone: phone,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if(data.status === 201) {
                    alert("login successful");
                    window.localStorage.setItem("token", data.data);
                    window.location.href = "./dashboard";
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            {/* <Header /> */}
            <div className="sign-in-container">
                <div className="title">Sign In</div>
                <form>
                    <div className="user-type">
                        <span className="user-type-title">Select way to sign in</span>
                        <div className="category">
                            <select className="dropdown" value={selected} onChange={dropdownHandler}>
                                <option value="email" >Email</option>
                                <option value="phone" >Phone</option>
                            </select>
                        </div>
                    </div>
                    <div className="user-details">
                        <div className="input-field" aria-hidden={selected !== "email" ? true : false}>
                            <span className="details">Email</span>
                            <input type="text" placeholder="Your email" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field" aria-hidden={selected !== "phone" ? true : false}>
                            <span className="details">Phone</span>
                            <input type="text" placeholder="Your phone number" required onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <span className="details">Password</span>
                            <input type="text" placeholder="Your password" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="button">
                        <input type="submit" value="Log In" onClick={(e) => handleSubmit(e)} />
                    </div>
                </form>
            </div>
        </>
    )
}