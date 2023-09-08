import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AdminDashboard, {loaderForDashboard} from './pages/AdminDashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminCategory, {loaderForCategory} from './pages/AdminCategory';
import AdminSellerManagement, {loaderForSellerManagement} from './pages/AdminSellerManagement';
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

