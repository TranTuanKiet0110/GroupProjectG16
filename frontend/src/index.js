import React from 'react';
import ReactDOM from 'react-dom/client';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AdminDashboard, { loaderForDashboard } from './pages/admin/AdminDashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminCategory, { loaderForCategory } from './pages/admin/AdminCategory';
import AdminSellerManagement, { loaderForSellerManagement } from './pages/admin/AdminSellerManagement';
import ProductPage, { loaderForProductPage } from './pages/seller/ProductPage';
import OrderPage, {loaderForOrderManagement} from './pages/seller/OrderPage';
import Customer from './pages/customer/Customer';

// import ProductList from '.pages/ProductList';
const isAdminLoggedIn = window.localStorage.getItem("adminLoggedIn");
const isSellerLoggedIn = window.localStorage.getItem("sellerLoggedIn");
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: isAdminLoggedIn === "true" ? <AdminDashboard /> : <SignIn />,
    loader: loaderForDashboard,
    // errorElement: <NotFound />,
  },
  {
    path: "/category",
    element: isAdminLoggedIn === "true" ? <AdminCategory /> : <SignIn />,
    loader: loaderForCategory,
    // errorElement: <NotFound />,
  },
  {
    path: "/sellerManagement",
    element: isAdminLoggedIn === "true" ? <AdminSellerManagement /> : <SignIn />,
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
    path: '/product',
    element: isSellerLoggedIn === "true" ? <ProductPage /> : <SignIn />,
    loader: loaderForProductPage,

  },
  {
    path: '/order',
    element: isSellerLoggedIn === "true" ? <OrderPage /> : <SignIn />,
    loader: loaderForOrderManagement,
  },
  {
    path: '/customer',
    element: <Customer />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

