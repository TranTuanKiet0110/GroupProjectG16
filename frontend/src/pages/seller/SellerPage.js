// import React from 'react';
// import "../../css/admin/admin.css";
// import Sidebar from '../../components/Sidebar';
// import menu from '../../img/menu.png';
// import admin from '../../img/admin.png';
// import customer from '../../img/customer.png';
// import pendingSeller from '../../img/pending_seller.png';
// import approvedSeller from '../../img/approved_seller.png';
// import categoriesImage from '../../img/categories.png';
// import { useLoaderData } from 'react-router';
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';


// export async function loaderForSellerDashboard() {
//     const [products] = await Promise.all([
//         fetch("http://localhost:8080/api/product/getallproduct").then((response) => response.json()),
//       ]);
//       return { products };
// };

// export default function SellerPage() {

//     const [userName, setUserName] = useState("");
//     const [userId, setUserId] = useState("");

//     useEffect(() => {
//         fetch("http://localhost:8080/api/user/sellerData", {
//           method: "POST",
//           crossDomain: true,
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//           body: JSON.stringify({
//             token: window.localStorage.getItem("token"),
//           }),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             console.log(data);
//             setUserName(data.data.name);
//             setUserId(data.data._id);
//           })
//           .catch((error) => console.log(error));
//       }, []);

//     const { sellers, categories } = useLoaderData();
//     // const data = sellers && sellers.data.map((seller, index) =>
//     //     <React.Fragment key={index + 1}>
//     //         <tr>
//     //             <td>{index + 1}</td>
//     //             <td>{seller.name}</td>
//     //             <td>{seller.email}</td>
//     //             <td>{seller.phone}</td>
//     //             <td>
//     //                 <span className={`status ${seller.status}`}></span>
//     //                 {seller.status}
//     //             </td>
//     //         </tr>
//     //     </React.Fragment>
//     // );

//     const numOfPendingSellers = sellers && sellers.data.filter((seller) => seller.status === 'pending');
//     const numOfApprovedSellers = sellers && sellers.data.filter((seller) => seller.status === 'approved');
//     const numOfCategories = categories && categories.data.filter((category) => category.name !== '');

//     function logOut() {
//         window.localStorage.clear();
//         window.location.href = "./signin";
//     };
    
//     return (
//         <>
//             <div className="admin-container">
//                 <Sidebar />
//                 <div className="main-content">
//                     <header>
//                         <div className="box">
//                             <img src={menu} alt="Menu" />
//                             <span>Dashboard</span>
//                         </div>

//                         <div className="user-wrapper">
//                             <button onClick={() => logOut()}>Log out</button>
//                             <img src={admin} width="30px" height="30px" alt="Admin" />
//                             <div>
//                                 <h4>Welcome,</h4>
//                                 <small> {userName} !</small>
//                             </div>
//                         </div>
//                     </header>

//                     <main>
//                         <div className="cards">
//                             <div className="card">
//                                 <div>
//                                     <h1>10</h1>
//                                     <span>Customers</span>
//                                 </div>
//                                 <div>
//                                     <img src={customer} width="30px" height="30px" alt="Customer" />
//                                 </div>
//                             </div>
//                             <div className="card">
//                                 <div>
//                                     <h1>{numOfPendingSellers.length}</h1>
//                                     {numOfPendingSellers.length < 2 ? <span>Pending seller</span> : <span>Pending sellers</span>}
//                                 </div>
//                                 <div>
//                                     <img src={pendingSeller} width="30px" height="30px" alt="Pending seller" />
//                                 </div>
//                             </div>
//                             <div className="card">
//                                 <div>
//                                     <h1>{numOfApprovedSellers.length}</h1>
//                                     {numOfApprovedSellers.length < 2 ? <span>Approved seller</span> : <span>Approved sellers</span>}
//                                 </div>
//                                 <div>
//                                     <img src={approvedSeller} width="30px" height="30px" alt="Approved seller" />
//                                 </div>
//                             </div>
//                             <div className="card">
//                                 <div>
//                                     <h1>{numOfCategories.length}</h1>
//                                     {numOfCategories.length < 2 ? <span>Category</span> : <span>Categories</span>}
//                                 </div>
//                                 <div>
//                                     <img src={categoriesImage} width="30px" height="30px" alt="Categories" />
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="sellers-management">
//                             <div className="accounts">
//                                 <div className="card">
//                                     <div className="card-header">
//                                         <h2>Sellers Management</h2>
//                                         <button><Link to={`/sellerManagement`}>See more</Link></button>
//                                     </div>

//                                     <div className="card-body">
//                                         <div className="table-responsive">
//                                             <table>
//                                                 <thead>
//                                                     <tr>
//                                                         <td>ID</td>
//                                                         <td>Name</td>
//                                                         <td>Email</td>
//                                                         <td>Phone number</td>
//                                                         <td>Status</td>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {/* {data} */}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </>
//     )
// }