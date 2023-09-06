import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 10.99, dateAdded: '2023-08-01' },
    { id: 2, name: 'Product B', price: 11.99, dateAdded: '2023-08-01' },
    { id: 3, name: 'Product C', price: 5.99, dateAdded: '2023-08-03' },
    { id: 4, name: 'Product D', price: 7.99, dateAdded: '2023-08-06' },
    
  ]);

  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [sortType, setSortType] = useState('');

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const handleSort = (type) => {
    setSortType(type);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (type === 'name') return a.name.localeCompare(b.name);
      if (type === 'price') return a.price - b.price;
      if (type === 'dateAdded') return new Date(a.dateAdded) - new Date(b.dateAdded);
    });

    setFilteredProducts(sortedProducts);
  };

  const handleFilter = (query) => {
    if (query === '') {
      setFilteredProducts([...products]);
    } else {
      const filtered = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredProducts(filtered);
    }
  };

  const handleEdit = (productId, editedProduct) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? editedProduct : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };
  
  const handleAdd = (newProduct) => {
    const updatedProducts = [...products, { ...newProduct, id: generateUniqueId() }];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };
  const generateUniqueId = () => {
    
    return Date.now();
  };
  
  const handleSave = (productId, editedProduct) => {
    if (productId) {
      handleEdit(productId, editedProduct);
    } else {
      handleAdd(editedProduct);
    }
  };
  const handleAddNew = () => {
    
    const emptyProduct = { id: null, name: '', price: 0, dateAdded: '' };
    setFilteredProducts([emptyProduct, ...filteredProducts]);
  };

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <label>Filter by Name: </label>
        <input type="text" onChange={(e) => handleFilter(e.target.value)} />
      </div>
      <div>
        <label>Sort by: </label>
        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="">Select</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="dateAdded">Date Added</option>
        </select>
        <button onClick={handleAddNew}>Add New Product</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Date Added</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.dateAdded}</td>
              <td>
              <ProductForm product={product} onSave={(editedProduct) => handleSave(product.id, editedProduct)} />     </td>

              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
