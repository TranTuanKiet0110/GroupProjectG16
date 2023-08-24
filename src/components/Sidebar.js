import React from "react";
// import { useState } from "react";
import { NavLink } from 'react-router-dom';
import home from '../img/home.png';
import product from '../img/product.png';
import seller from '../img/seller.png';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-brand">
                <h1>Lazada</h1>
            </div>

            <div className="sidebar-menu">
                <ul>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                            <img src={home} alt="Dashboard" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/categories" className={({ isActive }) => isActive ? 'active' : ''}>
                            <img src={product} alt="Product" />
                            <span>Product Category</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sellerManagement" className={({ isActive }) => isActive ? 'active' : ''}>
                            <img src={seller} alt="Seller" />
                            <span>Seller Management</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>

    );
}