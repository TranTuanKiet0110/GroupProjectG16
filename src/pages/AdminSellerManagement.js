import React from 'react'
// import Header from '../components/Header'
import "../css/admin.css";
import Sidebar from '../components/Sidebar';
import menu from '../img/menu.png';
import admin from '../img/admin.png';

export default function AdminSellerManagement() {
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
                                                    <td>Name</td>
                                                    <td>Email</td>
                                                    <td>Phone number</td>
                                                    <td>Business name</td>
                                                    <td>Status</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Kiet</td>
                                                    <td>s3879300@rmit.edu.vn</td>
                                                    <td>0913638494</td>
                                                    <td>Kiet123</td>
                                                    <td>
                                                        <span className="status green"></span>
                                                        Approved
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Khanh</td>
                                                    <td>s3804620@rmit.edu.vn</td>
                                                    <td>0123456789</td>
                                                    <td>Khanh123</td>
                                                    <td>
                                                        <span className="status green"></span>
                                                        Approved
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Minh</td>
                                                    <td>s3879953@rmit.edu.vn</td>
                                                    <td>0123456789</td>
                                                    <td>Khanh123</td>
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
        </>
    )
}