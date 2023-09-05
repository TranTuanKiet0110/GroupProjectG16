import React from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css';
export default function Navbar() {
  return (
    <>
        <h1>Là Giá Da</h1>
        <ul>
          <li>
            <Link
              to="/"
              className={({ isActive }) =>
                isActive ? 'active' : ''
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/product'
              className={({ isActive }) =>
                isActive ? 'active' : ''
              }
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to='/order'
              className={({ isActive }) =>
                isActive ? 'active' : ''
              }
            >
              Oder Managament
            </Link>
          </li>
        </ul>

    </>
  )
}