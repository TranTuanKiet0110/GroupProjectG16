import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import ProductCard from '../../components/customer/ProductCard'
import ShoppingCart from '../../components/customer/ShoppingCart'
import { ProductContext } from '../../contexts/ProductContext'
import { AuthContext } from '../../contexts/AuthContext'
import OrderList from '../../components/customer/OrderList'
import { CustomerContext } from '../../contexts/CustomerContext'
import { Link } from "react-router-dom";

import '../../css/customer/customer.css'

function Customer() {
    const { products, categories } = useContext(ProductContext);
    const { authState } = useContext(AuthContext);
    const { handleCustomerLogout } = useContext(CustomerContext)
    const { user } = authState;

    const [spans] = useState([
        { id: 'MobileDevice', text: 'Mobile device' },
        { id: 'Appliances', text: 'Appliances' },
        { id: 'Earphones', text: 'Earphones' },
        { id: 'Clothes', text: 'Clothes' },
    ])

    // category state
    const [category, setCategory] = useState('');

    // handle change ... it will set category and active states
    const handleSpanChange = (individualSpan) => {
        setCategory(individualSpan.name);
        doProductFilter(individualSpan.name);
    }

    // filtered products state
    const [filteredProducts, setFilteredProducts] = useState([]);

    // filter function
    const doProductFilter = (text) => {
        if (products.length > 1) {
            const filter = products.filter((product) => product.category.name === text);
            setFilteredProducts(filter);
        }
        else {
            console.log('No products to filter')
        }
    }

    // return to all products
    const returntoAllProducts = () => {
        setCategory('');
        setFilteredProducts([]);
    }

    const handleSearchKeyChange = (e) => {
        if (products.length > 1) {
            const searchKey = e.target.value.trim();
            if (searchKey !== '') {
                const filtered = products.filter((product) => product.name.toLowerCase().includes(searchKey.toLowerCase()));
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts([]);
            }
        }
    }

    const handleLogout = () => handleCustomerLogout()

    return (
        <div className='main'>


            <div className='container body'>
                <div className='container d-flex justify-content-end pt-2'>
                    <div className='d-flex align-items-center me-2'>{(user !== null) ? ('Hi, ' + user.name) : ('Using as guest')}</div>
                    <div className=''>{(user !== null) ? (<button className='btn btn-primary' onClick={() => handleLogout()}>Log out</button>) : (<></>)}</div>
                </div>

                <div className='container products'>
                    <div className='filter-box'>
                        <h4 className='s-title'>Filter by category</h4>
                        <ul>
                            {categories.map((category) => (
                                <li key={category._id}
                                    onClick={() => handleSpanChange(category)}
                                >{category.name}</li>
                            ))}
                        </ul>
                        <div className='container search-box'>
                            <h4 className='s-title'>Search</h4>
                            <input type="text" onChange={handleSearchKeyChange} />
                        </div>
                        <div className='container'>
                            <h4 className='s-title'>Navigation</h4>
                            <ul>
                                <li>
                                    <Link
                                        to="/customer/cart"
                                        className={({ isActive }) =>
                                            isActive ? 'active' : ''
                                        }
                                    >
                                        My shopping cart
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/customer/orders"
                                        className={({ isActive }) =>
                                            isActive ? 'active' : ''
                                        }
                                    >
                                        My order list
                                    </Link>
                                </li>

                                {(user !== null) ? (<></>) : (
                                    <li>
                                    <Link
                                        to="/login/customer"
                                        className={({ isActive }) =>
                                            isActive ? 'active' : ''
                                        }
                                    >
                                        Login
                                    </Link>
                                </li>
                                )}
                                
                            </ul>
                        </div>
                    </div>

                    {filteredProducts.length > 0 && (
                        <div className='my-products'>
                            <div className='main-title'>{category ? category : 'Search result'}</div>
                            <button className="btn btn-link" onClick={returntoAllProducts} style={{ color: 'black' }}>Return to All Products</button>
                            <div className="container">
                                <div className='products-box row row-cols-1 row-cols-sm-2 row-cols-lg-3'>
                                    {filteredProducts.map(product => (
                                        <div className="p-3" key={product._id}>
                                            <ProductCard className="col" product={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {filteredProducts.length < 1 && (
                        <>
                            {products.length > 0 && (
                                <div className='my-products'>
                                    <div className='main-title'>All Products</div>
                                    <div className="container">
                                        <div className='products-box row row-cols-1 row-cols-sm-2 row-cols-lg-3'>
                                            {products.map(product => (
                                                <div className="p-3" key={product._id}>
                                                    <ProductCard className="col" product={product} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {products.length < 1 && (
                                <div className='my-products please-wait'>Please wait...</div>
                            )}
                        </>
                    )}



                </div>

                {/* <div className='container shopping-cart'>
                    <h2>My Shopping Cart</h2>
                    <div className='container'>
                        <div>
                            <ShoppingCart />
                        </div>
                    </div>
                </div> */}

                {/* <div className='container orders'>
                    <h2>My Order List</h2>
                    <div className='container'>
                        <div>
                            <OrderList />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Customer