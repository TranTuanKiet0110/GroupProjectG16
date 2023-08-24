import React from 'react'
// import Header from '../components/Header'
import "../css/admin.css";
import Sidebar from '../components/Sidebar';
import menu from '../img/menu.png';
import admin from '../img/admin.png';
import { useLoaderData } from 'react-router';
import { getSellers } from '../api/sellers';

export async function loadSellers() {
    const sellers = await getSellers();
    return sellers;
}

export default function AdminSellerManagement() {
    const sellers = useLoaderData();
    const data = sellers && sellers.map((seller) =>
        <tr>
            <td>{seller.id}</td>
            <td>{seller.name}</td>
            <td>{seller.email}</td>
            <td>{seller.phone}</td>
            <td>{seller.businessName}</td>
            <td>
                <span className={`status ${seller.status}`}></span>
                {seller.status}
            </td>
        </tr>
    );
    
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
                    <div className="sellers-management">
                        <div className="accounts">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Sellers Management</h2>
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
                                                    <td>Business name</td>
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