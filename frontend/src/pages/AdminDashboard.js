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
import { useLoaderData } from 'react-router';
// import { getSellersForDashboard } from '../api/sellers';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export async function loadSellersForDashboard() {
    const res = await fetch("http://localhost:8080/api/user/getallseller");
    const sellers = await res.json();
    return sellers;
}

export default function AdminDashboard() {

    const [userName, setUserName] = useState("");

    useEffect(() => {
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
    }, []);

    const sellers = useLoaderData();
    const data = sellers && sellers.data.map((seller, index) =>
        <React.Fragment key={index + 1}>
            <tr>
                <td>{index + 1}</td>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>{seller.phone}</td>
                <td>
                    <span className={`status ${seller.status}`}></span>
                    {seller.status}
                </td>
            </tr>
        </React.Fragment>
    );

    const numOfPendingSellers = sellers && sellers.data.filter((seller) => seller.status === 'pending');
    const numOfApprovedSellers = sellers && sellers.data.filter((seller) => seller.status === 'approved');

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
                                <small> {userName} !</small>
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
                                    <h1>{numOfPendingSellers.length}</h1>
                                    <span>Pending sellers</span>
                                </div>
                                <div>
                                    <img src={pendingSeller} width="30px" height="30px" alt="Pending seller" />
                                </div>
                            </div>
                            <div className="card">
                                <div>
                                    <h1>{numOfApprovedSellers.length}</h1>
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
                                        <button><Link to={`/sellerManagement`}>See more</Link></button>
                                    </div>

                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td>ID</td>
                                                        <td>Name</td>
                                                        <td>Email</td>
                                                        <td>Phone number</td>
                                                        <td>Status</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data}
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