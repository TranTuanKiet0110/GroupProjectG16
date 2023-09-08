import React from 'react'
// import Header from '../components/Header'
import "../css/admin.css";
import Sidebar from '../components/Sidebar';
// import home from '../img/home.png';
// import product from '../img/product.png';
// import seller from '../img/seller.png';
import menu from '../img/menu.png';
import admin from '../img/admin.png';
import { useState, useEffect } from 'react';

export default function AdminCategory() {
    const [userName, setUserName] = useState("");
    const [showForm, setShowForm] = useState(false)

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

    function handleShowForm() {
        setShowForm(!showForm);
    }

    return (
        <>
            <div className="admin-container">
                <Sidebar />
                <div className="main-content">
                    <header>
                        <div className="box">
                            <img src={menu} alt="Menu" />
                            <span>Category</span>
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
                        {showForm && (
                            <div className="form-main">
                                <div className="form-container">
                                    <div className="title"> Create category</div>
                                    <form>
                                        <div className="category-details">
                                            <div className="input-field">
                                                <span className="details">Category's name</span>
                                                <input type="text" placeholder="Enter category's name" required />
                                            </div>
                                        </div>
                                        <div className="button">
                                            <input type="submit" value="Create" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        <div className="category-management">
                            <div className="category">
                                <div className="card">
                                    <div className="card-header">
                                        <h2>Categories Management</h2>
                                        <button onClick={handleShowForm}>+ Create</button>
                                    </div>

                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td>ID</td>
                                                        <td>Name</td>
                                                        <td>Number of product</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Clothes</td>
                                                        <td>3</td>
                                                        <td>
                                                            <span className="status green"></span>
                                                            Approved
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Electrics</td>
                                                        <td>4</td>
                                                        <td>
                                                            <span className="status green"></span>
                                                            Approved
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>Vehicles</td>
                                                        <td>8</td>
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