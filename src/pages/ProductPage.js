

import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom'; // If you are using React Router for routing
import {  getAllProducts,
  getProductById,
  addProduct as addProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi, } from '../api/products'; // Import the getProduct function from your products.js module
  import '../css/ProductPage.css';


  const initialProduct = {
    id: null,
    name: '',
    description: '',
    price: 0,
    dateadd: '',
  };
function ProductPage() {
   const [products, setProducts] = useState(getAllProducts());
  const [product, setProduct] = useState(initialProduct);
  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const addProduct = () => {
    //const newId = products.length + 1; // Generate a new ID (replace with your logic)
  
    // Get the current date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits for month
    const day = currentDate.getDate().toString().padStart(2, '0'); // Ensure two digits for day
  
    if (products.some((p) => p.name.toLowerCase() === product.name.toLowerCase())) {
      // Display an error message or handle the duplicate name case as needed
      alert("Product with the same name already exists!");
      return;
    }
  
    // Create a new product with the current date
    const newProduct = {
      ...product,
      //id: newId,
      dateadd: `${day}/${month}/${year}`, // Format the date as 'dd/mm/yyyy'
    };
  
    addProductApi(newProduct); // Add the new product to the API
    setProducts([...products, newProduct]);
    setProduct(initialProduct);
  };
  

   // Update: Edit an existing product
   const editProduct = (id) => {
    const productToEdit = getProductById(id);
    setEditing(true);
    setProduct(productToEdit);
  };

  const updateProduct = () => {
    updateProductApi(product); // Update the product in the API
    setEditing(false);
    setProducts(
      products.map((p) => (p.id === product.id ? product : p))
    );
    setProduct(initialProduct);
  };

  // Delete a product
  const deleteProduct = (id) => {
    deleteProductApi(id); // Delete the product from the API
    setProducts(products.filter((p) => p.id !== id));
    setEditing(false);
    setProduct(initialProduct);
  };
  // Filter products by name
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort products by name
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });


  return (
    <div className="product-page">
      <h1>Product List</h1>
      <div className="filter-sort">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort by Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>
      </div>
      <table>
      <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.dateadd}</td>
                <td>
                  <button onClick={() => editProduct(product.id)}>Edit</button>
                  <button onClick={() => deleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      <div className="product-form-container">
        <h2>{editing ? 'Edit Product' : 'Add New Product'}</h2>
        <form className="form" id="form">
          <input 
            type="text"
            placeholder="Name"
            name="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: parseFloat(e.target.value) })
            }
          />
          {/* <input
            type="text"
            placeholder="Date Added"
            name="dateadd"
            value={product.dateadd}
            onChange={(e) =>
              setProduct({ ...product, dateadd: e.target.value })
            }
          /> */}
          {editing ? (
            <button type="button" onClick={updateProduct}>
              Save Changes
            </button>
          ) : (
            <button type="button" onClick={addProduct}>
              Add Product
            </button>
          )}
        </form>

      </div>
    </div>
  );
}

export default ProductPage;