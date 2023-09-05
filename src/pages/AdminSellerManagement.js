import React from 'react'
// import Header from '../components/Header'
import "../css/admin.css";
import Sidebar from '../components/Sidebar';
import menu from '../img/menu.png';
import admin from '../img/admin.png';
import { useLoaderData } from 'react-router';
import { getSellers } from '../api/sellers';
import { useState } from 'react';

export async function loadSellers() {
    const sellers = await getSellers();
    return sellers;
}

export default function AdminSellerManagement() {
    const options = ['approved', 'pending', 'rejected'];
    const sellers = useLoaderData();
    const data = sellers && sellers.map((seller) => { return seller }
    );

    const [sellerList, setSellerList] = useState(data)

    const sellerListTable = sellerList.map((seller) =>
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
            <td>
                <select onChange={(e) => handleStatusChange(seller.id, e.target.value)}>

                    <option>{seller.status}</option>
                    {options.map((option, index) => {
                        if (option !== seller.status) {
                            return <option key={index} >
                            {option}
                        </option>
                        }
                        return null;
                    })}
                </select>
            </td>
        </tr>
    );

    function handleStatusChange(sellerID, newStatus) {
        const newData = sellerList.map((seller) => {
            if (seller.id === sellerID) {
                return { ...seller, status: newStatus };
            }
            return seller;
        });
        setSellerList(newData)
    };

    return (
        <>
            <Sidebar />
            <div className="main-content">
                <header>
                    <div className="box">
                        <img src={menu} alt="Menu" />
                        <span>Sellers Management</span>
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
                                                {sellerListTable}
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