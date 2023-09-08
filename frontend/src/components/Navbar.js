import React from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css';
export default function Navbar() {
  return (
    <>
        <div className='header'>
  <h1>Lazada</h1>
  <nav className="nav">
    <ul>
      <li className='button'>
        <Link
          to="/"
          className={({ isActive }) =>
            isActive ? 'active' : ''
          }
        >
          Seller
        </Link>
      </li>
      <li className='button'>
        <Link
          to='/product'
          className={({ isActive }) =>
            isActive ? 'active' : ''
          }
        >
          Products
        </Link>
      </li>
      <li className='button'>
        <Link
          to='/order'
          className={({ isActive }) =>
            isActive ? 'active' : ''
          }
        >
          Order Management
        </Link>
      </li>
      <li className='button'>
        <Link
          to='/statistic'
          className={({ isActive }) =>
            isActive ? 'active' : ''
          }
        >
          Sales Statistics
        </Link>
      </li>
    </ul>
  </nav>
</div>


      

    </>
  )
}