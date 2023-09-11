import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import axios from 'axios';
import { Outlet } from 'react-router-dom';


const API_URL = 'http://localhost:8080';


export const ProductContext = createContext();

const ProductContextProvider = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await axios.get(`${API_URL}/products`);
                setProducts(res.data.products);
            } catch (error) {
                return {success: false, msg: error.message};
            }
        }
        loadProducts();
    }, []);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/category/getAllCategory`);
                if (res.data.data) {
                    setCategories(res.data.data);
                }
            } catch (error) {
                return { success: false, msg: error.message }
            }
        }
        loadCategories()
    }, [])

    const productContextData = {products, categories};

    return (
        <ProductContext.Provider value={productContextData}><Outlet/></ProductContext.Provider>
    )
}

export default ProductContextProvider