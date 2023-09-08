import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AdminDashboard, {loadSellersForDashboard} from './pages/AdminDashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminCategory from './pages/AdminCategory';
import AdminSellerManagement, {loadSellers} from './pages/AdminSellerManagement';
import SelerPage from './pages/SelerPage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import StatisticsPage from './pages/StatisticsPage';
import Navbar from './components/Navbar';
// import ProductList from '.pages/ProductList';

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <AdminDashboard />,
    loader: loadSellersForDashboard,
    // errorElement: <NotFound />,
  },
  {
    path: "/category",
    element: <AdminCategory />,
    // errorElement: <NotFound />,
  },
  {
    path: "/sellerManagement",
    element: <AdminSellerManagement />,
    loader: loadSellers,
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
    path: '/',
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
    path: '/nav',
    element: <Navbar />,
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

