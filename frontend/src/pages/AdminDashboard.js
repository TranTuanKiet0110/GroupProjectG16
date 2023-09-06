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
import { getSellersForDashboard } from '../api/sellers';
import { Link } from 'react-router-dom';

export async function loadSellersForDashboard() {
    const sellers = await getSellersForDashboard();
    return sellers;
}

export default function AdminDashboard() {
    const sellers = useLoaderData();
    const data = sellers && sellers.map((seller) =>
        <tr>
            <td>{seller.id}</td>
            <td>{seller.name}</td>
            <td>{seller.email}</td>
            <td>{seller.phone}</td>
            <td>
                <span className={`status ${seller.status}`}></span>
                {seller.status}
            </td>
        </tr>
    );

    const numOfPendingSellers = sellers && sellers.filter((seller) => seller.status === 'pending');
    const numOfApprovedSellers = sellers && sellers.filter((seller) => seller.status === 'approved');

    return (
        <>
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
                            <small>Admin !</small>
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
        </>
    )
}