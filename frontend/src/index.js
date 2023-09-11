import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AdminDashboard, { loaderForDashboard } from './pages/admin/AdminDashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminCategory, { loaderForCategory } from './pages/admin/AdminCategory';
import AdminSellerManagement, { loaderForSellerManagement } from './pages/admin/AdminSellerManagement';
import SelerPage from './pages/seller/SelerPage';
import ProductPage from './pages/seller/ProductPage';
import OrderPage from './pages/seller/OrderPage';
import StatisticsPage from './pages/seller/StatisticsPage';
import Customer from './pages/customer/Customer';
import ProductsContextProvider from './contexts/ProductContext';
import CustomerContextProvider from './contexts/CustomerContext';
import AuthContextProvider from './contexts/AuthContext';
import App from './App';

// import ProductList from '.pages/ProductList';

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <AdminDashboard />,
    loader: loaderForDashboard,
    // errorElement: <NotFound />,
  },
  {
    path: "/category",
    element: <AdminCategory />,
    loader: loaderForCategory,
    // errorElement: <NotFound />,
  },
  {
    path: "/sellerManagement",
    element: <AdminSellerManagement />,
    loader: loaderForSellerManagement,
    // errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
    // errorElement: <NotFound />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
    // errorElement: <NotFound />,
  },
  {
    path: '/sellerpage',
    element: <SelerPage />,
  },
  {
    path: '/product',
    element: <ProductPage />,

  },
  {
    path: '/order',
    element: <OrderPage />,
  },
  {
    path: '/statistic',
    element: <StatisticsPage />,
  },
  {
    path: '/customer',
    element: <AuthContextProvider><ProductsContextProvider><CustomerContextProvider><Customer /></CustomerContextProvider></ProductsContextProvider></AuthContextProvider>,
  },



]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

