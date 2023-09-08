import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom'; 
import categories, {  getAllProducts,
  getProductById,
  addProduct as addProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi, 
 } from '../api/products'; 
  import '../css/ProductPage.css';
  import Navbar from '../components/Navbar';

  const initialProduct = {
    id: null,
    name: '',
    description: '',
    price: 0,
    dateadd: '',
    categoryId: 0,
    additionalAttr: [],
  };
  function ProductPage1() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(initialProduct);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [additionalAttrInput, setAdditionalAttrInput] = useState('');
    const [additionalAttr, setAdditionalAttr] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
    
    
    const [editing, setEditing] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const productData = await getAllProducts();
          const productsWithCategory = productData.map((product) => {
            const categoryInfo = getCategoryInfo(product.categoryId);
            return {
              ...product,
              categoryName: categoryInfo.name,
            };
          });
          setProducts(productsWithCategory);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching products:', error);
          setIsLoading(false);
        }
      };
    
      fetchData();
    }, []);
    
  
    // Define a function to get the additional attributes based on categoryId
    const getAdditionalAttrByCategoryId = (categoryId) => {
      const category = categories.find((cat) => cat.categoryId === categoryId);
      return category ? category.additionalAttr : [];
    };
    
    const addProduct = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
    
        if (products.some((p) => p.name.toLowerCase() === product.name.toLowerCase())) {
          alert("Product with the same name already exists!");
          return;
        }
    
        const selectedCategoryInfo = getCategoryInfo(selectedCategory);
    
        const newProduct = {
          ...product,
          dateadd: `${day}/${month}/${year}`,
          categoryId: selectedCategory,
          categoryName: selectedCategoryInfo.name,
          additionalAttr: additionalAttr,
        };
    
        addProductApi(newProduct);
        setProducts([...products, newProduct]);
        setProduct(initialProduct);
        setAdditionalAttr([]);
      };
    
      const handleAddAttribute = () => {
        if (additionalAttrInput.trim() === '') {
          return;
        }
    
        const [key, value] = additionalAttrInput.split(':').map((item) => item.trim());
    
        if (key && value) {
          setAdditionalAttr([...additionalAttr, { [key]: value }]);
          setAdditionalAttrInput('');
        } else {
          alert("Please enter additional attributes in the 'key: value' format.");
        }
      };
    
      const handleRemoveAttribute = (index) => {
        const updatedAttributes = [...additionalAttr];
        updatedAttributes.splice(index, 1);
        setAdditionalAttr(updatedAttributes);
      };
    
      const getCategoryInfo = (categoryId) => {
        return categories.find((cat) => cat.categoryId === categoryId) || { name: '', additionalAttr: [] };
      };
    if (isLoading) {
      return <div>Loading...</div>;
    }
  

    const attributeKeys = Array.from(
      new Set(
        products.reduce((keys, product) => {
          return keys.concat(
            getAdditionalAttrByCategoryId(product.categoryId).flatMap((attr) => Object.keys(attr))
          );
        }, [])
      )
    );
    const editProduct = (id) => {
      const productToEdit = getProductById(id);
      setEditing(true);
      setProduct(productToEdit);
      
    }
  
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
    }
 // Filter products based on the filterText and selectedCategory
const filteredProducts = products.filter((product) => {
  return (
    (selectedCategory === 0 || product.categoryId === selectedCategory) &&
    (filterText === '' || product.name.toLowerCase().includes(filterText.toLowerCase()))
  );
});

// Sort products based on the sortOrder
filteredProducts.sort((a, b) => {
  if (sortOrder === 'asc') {
    return a.name.localeCompare(b.name);
  } else {
    return b.name.localeCompare(a.name);
  }
});




    return (
      
      <div class='productpage'>
        <Navbar />
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
          <select
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
          >
            <option value={0}>Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
            <div className="attr-input">
              <input
                type="text"
                placeholder="Key: Value"
                value={additionalAttrInput}
                onChange={(e) => setAdditionalAttrInput(e.target.value)}
              />
              <button class="second-button"  onClick={handleAddAttribute}>
                Add
              </button>
            
            <ul>
              {additionalAttr.map((attr, index) => (
                <li key={index}>
                  {Object.keys(attr)[0]}: {Object.values(attr)[0]}
                  <button
                    type="button"
                    onClick={() => handleRemoveAttribute(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          { editing ? (
            <button class="primary-button"type="button" onClick={updateProduct}>
              Save Changes
            </button>
          ) : (
            <button  class="primary-button" type="button" onClick={addProduct}>
              Add Product
            </button>
          )}
        </form>
      </div>
     <div className='filterandsort'>{/* Filter input */}
      <input className='filter'
      type="text"
      placeholder="Filter by Product Name"
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
      />

      {/* Sort order selection */}
      <select className='sort'
      name="sortOrder"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
      </select>
    </div>

      <div class='product-table'>
      {/* {categories.map((category) => (
          <div key={category.categoryId}>
            <h2>Category: {category.name}</h2> */}
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Date Add</th>
                  {attributeKeys.map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
              {filteredProducts
                .map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                      <td>{product.dateadd}</td>
                      {attributeKeys.map((key) => (
                      <td key={key}>
                      {getAdditionalAttrByCategoryId(product.categoryId).map((attr, index) => (
                      <span key={index}>
                      {attr[key] || ''} {/* Display '-' for missing attributes */}
                    {index < getAdditionalAttrByCategoryId(product.categoryId).length - 1 && ', '}
                  </span>
                ))}
              </td>
            ))}
            <td>{product.categoryName}</td> {/* Display the category name */}
            <button className="edit-button" onClick={() => editProduct(product.id)}>Edit</button>
            <button className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</button>
            
            
          </tr>
        ))}
            </tbody>
            </table>
          </div>
        {/* ))}</div>     */}
        
      </div>
    );
  }
  
  export default ProductPage1;

