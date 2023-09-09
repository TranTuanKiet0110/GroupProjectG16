import React from 'react'
// import Header from '../components/Header'
import "../../css/admin/admin.css";
import Sidebar from '../../components/Sidebar';
import menu from '../../img/menu.png';
import admin from '../../img/admin.png';
import { useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';

export async function loaderForSellerManagement() {
    const res = await fetch("http://localhost:8080/api/user/getallseller");
    const sellers = await res.json();
    return sellers;
}

export default function AdminSellerManagement() {

    const options = ['approved', 'pending', 'rejected'];
    const [userName, setUserName] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/user/admindata", {
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
                <td>
                    <select onChange={(e) => handleStatusChange(seller._id, e.target.value)}>
                        <option>{seller.status}</option>
                        {options.map((option, index) => {
                            if (option !== seller.status) {
                                return <option key={index + 1} >
                                    {option}
                                </option>
                            }
                            return null;
                        })}
                    </select>
                </td>
            </tr>
        </React.Fragment>
    );

    function handleStatusChange(sellerID, newStatus) {
        fetch(`http://localhost:8080/api/user/updateseller/${sellerID}`, {
            method: "PATCH",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id: sellerID,
                newStatus: newStatus,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === 201) {
                    window.location.href = "./sellermanagement";
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="admin-container">
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
                                <small>{userName} !</small>
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
            </div>
        </>
    )
}