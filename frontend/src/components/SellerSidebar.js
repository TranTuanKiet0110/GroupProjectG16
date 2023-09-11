import React from "react";
// import { useState } from "react";
import { NavLink } from 'react-router-dom';
import home from '../img/home.png';
import product from '../img/product.png';
import seller from '../img/seller.png';

export default function SellerSidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-brand">
                <h1>Lazada Seller</h1>
            </div>

            <div className="sidebar-menu">
                <ul>
                    <li>
                        <NavLink to="/sellerpage" className={({ isActive }) => isActive ? 'active' : ''}>
                            <img src={home} alt="Dashboard" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/product" className={({ isActive }) => isActive ? 'active' : ''}>
                            <img src={product} alt="Product" />
                            <span>Products management</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order" className={({ isActive }) => isActive ? 'active' : ''}>
                            <img src={seller} alt="Order" />
                            <span>Orders Management</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>

    );
}