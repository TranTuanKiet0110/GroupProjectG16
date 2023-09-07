import React from "react";
import { useState } from "react";

function Radio(setBusinessName, setAddress) {
    const [selected, setSelected] = useState("seller");

    const radioHandler = e => {
        setSelected(e.target.value);
    };

    function handleBusinessName(newName) {
        setBusinessName.setBusinessName(newName);
    }

    function handleAddress(newAddress) {
        setAddress.setAddress(newAddress);
    }

    return (
        <>
            <div className="user-type">
                <input type="radio" name="type" id="dot-1" value="seller" checked={selected === "seller"} onChange={radioHandler} />
                <input type="radio" name="type" id="dot-2" value="customer" checked={selected === "customer"} onChange={radioHandler} />
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
                </div>
            </div>
            <div className="form-extension">
                <div aria-hidden={selected !== "seller" ? true : false}>
                    <div className="input-field">
                        <span className="details">Business Name</span>
                        <input type="text" placeholder="Enter your business name" required onChange={(e) => {handleBusinessName(e.target.value)}} />
                    </div>
                </div>
                <div aria-hidden={selected !== "customer" ? true : false}>
                    <div className="input-field">
                        <span className="details">Address</span>
                        <input type="text" placeholder="Enter your address" required onChange={(e) => {handleAddress(e.target.value)}} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Radio;