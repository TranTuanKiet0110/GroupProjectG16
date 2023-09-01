import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import Register from './pages/Register';
// import AdminDashboard, {loadSellersForDashboard} from './pages/AdminDashboard';

// import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
// import AdminCategory from './pages/AdminCategories';
// import AdminSellerManagement, {loadSellers} from './pages/AdminSellerManagement';
// import ProductList from '.pages/ProductList'

// const router = createBrowserRouter([
//   {
//     path: "/dashboard",
//     element: <AdminDashboard />,
//     loader: loadSellersForDashboard,
//     // errorElement: <NotFound />,
//   },
//   {
//     path: "/category",
//     element: <AdminCategory />,
//     // errorElement: <NotFound />,
//   },
//   {
//     path: "/sellerManagement",
//     element: <AdminSellerManagement />,
//     loader: loadSellers,
//     // errorElement: <NotFound />,
//   },

// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    {/* <ProductList/> */}
    <Register/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

