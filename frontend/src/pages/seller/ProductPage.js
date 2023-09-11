import React from 'react';
// import Header from '../components/Header'
import "../../css/admin/admin.css";
import SellerSidebar from '../../components/SellerSidebar';
import menu from '../../img/menu.png';
import admin from '../../img/admin.png';
import { useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';


export async function loaderForProductPage() {
  const [products, categories] = await Promise.all([
    fetch("http://localhost:8080/api/product/getallproduct").then((response) => response.json()),
    fetch("http://localhost:8080/api/category/getallcategory").then((response) => response.json()),
  ]);
  return { products, categories };
}

export default function ProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [imageURL, setImagegURL] = useState("");
  const [price, setPrice] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [additionalAttributes, setAdditionalAttributes] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editId, setEditId] = useState("");
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImgURL, setNewImgURL] = useState("");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/user/sellerData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserName(data.data.name);
        setUserId(data.data._id);
      })
      .catch((error) => console.log(error));
  }, []);

  const { products, categories } = useLoaderData();
  const data = products.data && products.data.map((product, index) => {
    if (product.seller === userId) {
      return <React.Fragment key={index + 1}>
        <tr>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td><a href={product.imgURL}>View image</a></td>
          <td>{product.price}</td>
          <td>{categories.data && categories.data.map((category) => (category._id === product.category ? category.name : null))}</td>
          <td>{product.additionalAttributes.map((attribute) => <div><span>{attribute.name}:</span><span> {attribute.value}</span></div>)}</td>
          <td>
            <button className="editBtn" onClick={() => handleEdit(product._id)}>Edit</button>
            <button className="deleteBtn" onClick={() => handleDelete(product._id, product.name)}>Delete</button>
          </td>
        </tr>
      </React.Fragment>
    }
    return null;
  });

  const dataForSelector = categories && categories.data.map((category, index) =>
    <React.Fragment key={index + 1}>
      <option value={category._id}>{category.name}</option>
    </React.Fragment>
  );


  function handleShowForm() {
    setShowForm(!showForm);
    setShowEditForm(false);
  }

  function dropdownHandler(selectedCategory) {
    const storeAttribute = []
    if (selectedCategory === "none") {
      setAdditionalAttributes([]);
    } else {
      for (const category of categories.data) {
        if (category._id === selectedCategory) {
          setSelectedCategory(selectedCategory);

          for (const attribute of category.additionalAttributes) {
            storeAttribute.push({ name: attribute.name, value: attribute.value });
          }
        }
      }
      setAdditionalAttributes(storeAttribute);
    }
  };

  function handleAttributeValue(e, index) {
    const list = [...additionalAttributes];
    list[index].value = e.target.value;
    setAdditionalAttributes(list);
  }

  function handleEdit(productId) {
    setShowEditForm(!showEditForm);
    setShowForm(false);
    setEditId(productId);
  };

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete ${productName}?`)) {
      fetch("http://localhost:8080/api/product/deleteproduct", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: productId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 204) {
            window.location.href = "./product";
          }
        })
        .catch((error) => console.log(error));
    } else {

    }
  };

  function handleUpdate(productId) {
    fetch(`http://localhost:8080/api/product/updateproduct/${productId}`, {
      method: "PATCH",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: productId,
        newName: newName,
        newDescription: newDescription,
        newImgURL: newImgURL,
        newPrice: newPrice,
        newCategory: selectedCategory,
        newAdditionalAttributes: additionalAttributes,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          window.location.href = "./product";
        }
      })
      .catch((error) => console.log(error));
  };

  function logOut() {
    window.localStorage.clear();
    window.location.href = "./signin";
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8080/api/product/createproduct", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        imgURL: imageURL,
        price: price,
        category: selectedCategory,
        seller: userId,
        additionalAttributes: additionalAttributes,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          //   alert("create successful");
          window.location.href = "./product";
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="admin-container">
        <SellerSidebar />
        <div className="main-content">
          <header>
            <div className="box">
              <img src={menu} alt="Menu" />
              <span>Products Management</span>
            </div>

            <div className="user-wrapper">
              <button onClick={() => logOut()}>Log out</button>
              <img src={admin} width="30px" height="30px" alt="Admin" />
              <div>
                <h4>Welcome,</h4>
                <small>{userName} !</small>
              </div>
            </div>
          </header>

          <main>
            {showForm && (
              <div className="form-main">
                <div className="form-container">
                  <div className="title"> Create new product</div>
                  <form>
                    <div className="category-details">
                      <div className="input-field">
                        <span className="details">Product's name</span>
                        <input type="text" placeholder="Enter product's name" required onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="input-field">
                        <span className="details">Product's description</span>
                        <input type="text" placeholder="Enter product's description" required onChange={(e) => setDescription(e.target.value)} />
                      </div>
                      <div className="input-field">
                        <span className="details">Image URL</span>
                        <input type="text" placeholder="Enter product's imageURL" required onChange={(e) => setImagegURL(e.target.value)} />
                      </div>
                      <div className="input-field">
                        <span className="details">Product's price</span>
                        <input type="text" placeholder="Enter product's price" required onChange={(e) => setPrice(e.target.value)} />
                      </div>
                    </div>
                    <div className="category-details">
                      <div className="input-field">
                        <span className="details">Category:</span>
                        <select className="dropdown" onChange={(e) => dropdownHandler(e.target.value)}>
                          <option value="none">--None--</option>
                          {dataForSelector}
                        </select>
                      </div>
                    </div>
                    {additionalAttributes.map((attribute, index) => (
                      <React.Fragment key={index + 1}>
                        <div className="category-additional-details">
                          <div className="input-field">
                            <span className="details">Attribute's name</span>
                            <input type="text" required defaultValue={attribute.name} />
                          </div>
                          <div className="input-field">
                            <span className="details">Value</span>
                            <input type="text" placeholder="Enter value" required onChange={(e) => handleAttributeValue(e, index)} />
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                    <div className="button">
                      <input type="submit" value="Create" onClick={(e) => handleSubmit(e)} />
                    </div>
                  </form>
                </div>
              </div>
            )}

            {showEditForm && (
              <div className="form-main">
                <div className="form-container">
                  <div className="title"> Edit product</div>
                  {products.data && products.data.map((product) => {
                    if (product._id === editId) {
                      return <form>
                        <div className="category-details">
                          <div className="input-field">
                            <span className="details">Product's name</span>
                            <input type="text" placeholder={product.name} required onChange={(e) => setNewName(e.target.value)} />
                          </div>
                          <div className="input-field">
                            <span className="details">Product's description</span>
                            <input type="text" placeholder={product.description} required onChange={(e) => setNewDescription(e.target.value)} />
                          </div>
                          <div className="input-field">
                            <span className="details">Image URL</span>
                            <input type="text" placeholder={product.imgURL} required onChange={(e) => setNewImgURL(e.target.value)} />
                          </div>
                          <div className="input-field">
                            <span className="details">Product's price</span>
                            <input type="text" placeholder={product.price} required onChange={(e) => setNewPrice(e.target.value)} />
                          </div>
                        </div>
                        <div className="category-details">
                          <div className="input-field">
                            <span className="details">Category:</span>
                            <select className="dropdown" onChange={(e) => dropdownHandler(e.target.value)}>
                              <option value="none">--None--</option>
                              {categories.data && categories.data.map((category) => {
                                if (category._id === product.category) {
                                  return <option selected value={category._id}>{category.name}</option>
                                } else {
                                  return <option value={category._id}>{category.name}</option>
                                }
                              })}
                            </select>
                          </div>
                        </div>
                        {additionalAttributes.map((attribute, index) => (
                          <React.Fragment key={index + 1}>
                            <div className="category-additional-details">
                              <div className="input-field">
                                <span className="details">Attribute's name</span>
                                <input type="text" required defaultValue={attribute.name} />
                              </div>
                              <div className="input-field">
                                <span className="details">Value</span>
                                <input type="text" placeholder="Enter value" required onChange={(e) => handleAttributeValue(e, index)} />
                              </div>
                            </div>
                          </React.Fragment>
                        ))}
                        <div className="button">
                          <input type="submit" value="Update" onClick={(e) => handleUpdate(product._id)} />
                        </div>
                        <div className="cancelButton">
                          <input type="submit" value="Cancel" onClick={() => setShowEditForm(!showEditForm)} />
                        </div>
                      </form>
                    }
                    return null;
                  }
                  )}
                </div>
              </div>
            )}

            <div className="category-management">
              <div className="category">
                <div className="card">
                  <div className="card-header">
                    <h2>Products management</h2>
                    <button onClick={handleShowForm}>+ Create</button>
                  </div>

                  <div className="card-body">
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Image</td>
                            <td>Price $</td>
                            <td>Category</td>
                            <td>Additional Details</td>
                            <td>Action</td>
                          </tr>
                        </thead>
                        <tbody>
                          {data}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}