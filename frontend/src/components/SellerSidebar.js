import React from "react";
import { NavLink } from 'react-router-dom';
import product from '../img/product.png';
import order from '../img/order.png'

export default function SellerSidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-brand">
                <h1>Lazada Seller</h1>
            </div>

            <div className="sidebar-menu">
                <ul>
                    <li>
                        <NavLink to="/product" className={({ isActive }) => isActive ? 'active' : ''}>
                            <img src={product} alt="Product" />
                            <span>Products management</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order" className={({ isActive }) => isActive ? 'active' : ''}>
                            <img src={order} alt="Order" />
                            <span>Orders Management</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>

    );
}