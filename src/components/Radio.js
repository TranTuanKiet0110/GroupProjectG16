import React from "react";
import { useState } from "react";

function Radio() {
    const [selected, setSelected] = useState("");

    const radioHandler = e => {
        setSelected(e.target.value);
    };

    return (
        <>
            <div className="user-type">
                <input type="radio" name="type" id="dot-1" value="seller" checked={selected === "seller"} onChange={radioHandler} />
                <input type="radio" name="type" id="dot-2" value="customer" checked={selected === "customer"} onChange={radioHandler} />
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
            </div>
            <div className="form-extension">
                <div aria-hidden={selected !== "seller" ? true : false}>
                    <div className="input-field">
                        <span className="details">Business Name</span>
                        <input type="text" placeholder="Enter your business name" required />
                    </div>
                </div>
                <div aria-hidden={selected !== "customer" ? true : false}>
                    <div className="input-field">
                        <span className="details">Address</span>
                        <input type="text" placeholder="Enter your address" required />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Radio;