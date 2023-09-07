import React from 'react'
// import Header from '../components/Header'
import "../css/admin.css";
import Sidebar from '../components/Sidebar';
// import home from '../img/home.png';
// import product from '../img/product.png';
// import seller from '../img/seller.png';
import menu from '../img/menu.png';
import admin from '../img/admin.png';
import customer from '../img/customer.png';
import pendingSeller from '../img/pending_seller.png';
import approvedSeller from '../img/approved_seller.png';
import categories from '../img/categories.png';
import { useState } from 'react';

export default function AdminCategory() {
    const [userName, setUserName] = useState("");

    fetch("http://localhost:8080/api/user/adminData", {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            token: window.localStorage.getItem("token"),
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setUserName(data.data.name);
        })
        .catch((error) => console.log(error));

    return (
        <>
            <div className="admin-container">
                <Sidebar />
                <div className="main-content">
                    <header>
                        <div className="box">
                            <img src={menu} alt="Menu" />
                            <span>Dashboard</span>
                        </div>

                        <div className="user-wrapper">
                            <img src={admin} width="30px" height="30px" alt="Admin" />
                            <div>
                                <h4>Welcome,</h4>
                                <small>{userName} !</small>
                            </div>
                        </div>
                    </header>

                    <main>
                        <div className="cards">
                            <div className="card">
                                <div>
                                    <h1>10</h1>
                                    <span>Customers</span>
                                </div>
                                <div>
                                    <img src={customer} width="30px" height="30px" alt="Customer" />
                                </div>
                            </div>
                            <div className="card">
                                <div>
                                    <h1>10</h1>
                                    <span>Pending sellers</span>
                                </div>
                                <div>
                                    <img src={pendingSeller} width="30px" height="30px" alt="Pending seller" />
                                </div>
                            </div>
                            <div className="card">
                                <div>
                                    <h1>10</h1>
                                    <span>Approved sellers</span>
                                </div>
                                <div>
                                    <img src={approvedSeller} width="30px" height="30px" alt="Approved seller" />
                                </div>
                            </div>
                            <div className="card">
                                <div>
                                    <h1>10</h1>
                                    <span>Categories</span>
                                </div>
                                <div>
                                    <img src={categories} width="30px" height="30px" alt="Categories" />
                                </div>
                            </div>
                        </div>

                        <div className="sellers-management">
                            <div className="accounts">
                                <div className="card">
                                    <div className="card-header">
                                        <h2>Sellers Management</h2>
                                        <button>See more</button>
                                    </div>

                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td>Name</td>
                                                        <td>Email</td>
                                                        <td>Phone number</td>
                                                        <td>Status</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Kiet</td>
                                                        <td>s3879300@rmit.edu.vn</td>
                                                        <td>0913638494</td>
                                                        <td>
                                                            <span className="status green"></span>
                                                            Approved
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Khanh</td>
                                                        <td>s3804620@rmit.edu.vn</td>
                                                        <td>0123456789</td>
                                                        <td>
                                                            <span className="status green"></span>
                                                            Approved
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Minh</td>
                                                        <td>s3879953@rmit.edu.vn</td>
                                                        <td>0123456789</td>
                                                        <td>
                                                            <span className="status red"></span>
                                                            Pending
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}