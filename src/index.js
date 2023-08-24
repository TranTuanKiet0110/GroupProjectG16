import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import AdminCategories from './pages/AdminCategories';
import AdminSellerManagement, {loadSellers} from './pages/AdminSellerManagement';

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <AdminDashboard />,
    // errorElement: <NotFound />,
  },
  {
    path: "/categories",
    element: <AdminCategories />,
    // errorElement: <NotFound />,
  },
  {
    path: "/sellerManagement",
    element: <AdminSellerManagement />,
    loader: loadSellers,
    // errorElement: <NotFound />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

