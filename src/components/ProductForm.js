import React, { useState } from 'react';

const ProductForm = ({ product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...product, ...editedProduct });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={editedProduct.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="price"
        value={editedProduct.price}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="dateAdded"
        value={editedProduct.dateAdded}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductForm;
