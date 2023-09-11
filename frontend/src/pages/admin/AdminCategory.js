import React from 'react';

import "../../css/admin/admin.css";
import Sidebar from '../../components/Sidebar';
import menu from '../../img/menu.png';
import admin from '../../img/admin.png';
import { useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';

//loader function
export async function loaderForCategory() {
    const [products, categories] = await Promise.all([
        fetch("http://localhost:8080/api/product/getallproduct").then((response) => response.json()),
        fetch("http://localhost:8080/api/category/getallcategory").then((response) => response.json()),
    ]);
    return { products, categories };
}

export default function AdminCategory() {
    //useState
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [additionalAttributes, setAdditionalAttributes] = useState([]);
    const [editId, setEditId] = useState("");
    const [newName, setNewName] = useState("");
    //get logged in account's data
    useEffect(() => {
        fetch("http://localhost:8080/api/user/adminData", {
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
            })
            .catch((error) => console.log(error));
    }, []);

    //useLoader to retrieve data and load into table
    const { products,categories } = useLoaderData();
    const data = categories.data && categories.data.map((category, index) => (
        category._id === editId ? //condition for editing data
            <React.Fragment key={index + 1}>
                <tr>
                    <td>{index + 1}</td>
                    <td><input type="text" placeholder={category.name} onChange={(e) => setNewName(e.target.value)}></input></td>
                    <td>{categories.data && categories.data.filter((subcategory) => category._id === subcategory.subcategoryOf).length}</td>
                    <td>0</td>
                    <td>
                        <button onClick={(e) => handleUpdate(category._id)}>Update</button>
                    </td>
                </tr>
            </React.Fragment>
            :
            <React.Fragment key={index + 1}>
                <tr>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>{categories.data && categories.data.filter((subcategory) => category._id === subcategory.subcategoryOf).length}</td>
                    <td>{categories.data && categories.data.map((subcategory) => (category.subcategoryOf === subcategory._id ? subcategory.name : null))}</td>
                    <td>{products.data && products.data.filter((product) => product.category === category._id).length}</td>
                    <td>
                        <button className="editBtn" onClick={() => handleEdit(category._id)}>Edit</button>
                        {categories.data && categories.data.filter((subcategory) => category._id === subcategory.subcategoryOf).length === 0 && products.data && products.data.filter((product) => product.category === category._id).length === 0 ? <button className="deleteBtn" onClick={() => handleDelete(category._id, category.name)}>Delete</button> : <button className="deleteBtnDisable" disabled>Delete</button>}
                        {/* <button>Delete</button> */}
                    </td>
                </tr>
            </React.Fragment>)
    );
    
    //get all category into option in select
    const dataForSelector = categories && categories.data.map((category, index) =>
        <React.Fragment key={index + 1}>
            <option value={category._id}>{category.name}</option>
        </React.Fragment>
    );

    //create category form
    function handleShowForm() {
        setShowForm(!showForm);
    }

    //add additional attribute 
    function handleAddAttribute() {
        setAdditionalAttributes([...additionalAttributes, { name: "", value: null }])
    }

    //remove addition attribute
    function handleRemoveAttribute(index) {
        const list = [...additionalAttributes];
        list.splice(index, 1);
        setAdditionalAttributes(list);
    }

    //add existing attribute from a category into form
    function handleAttributeName(e, index) {
        const list = [...additionalAttributes];
        list[index].name = e.target.value;
        setAdditionalAttributes(list);
    }

    //handle when select's option change
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

    //get category id
    function handleEdit(categoryId) {
        setEditId(categoryId);
    };

    //delete category
    const handleDelete = (categoryId, categoryName) => {
        if (window.confirm(`Are you sure you want to delete ${categoryName}?`)) {
            fetch("http://localhost:8080/api/category/deletecategory", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    id: categoryId,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 204) {
                        window.location.href = "./category";
                    }
                })
                .catch((error) => console.log(error));
        } else {

        }
    };

    //update category
    function handleUpdate(categoryId) {
        fetch(`http://localhost:8080/api/category/updatecategory/${categoryId}`, {
            method: "PATCH",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id: categoryId,
                newName: newName,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === 201) {
                    window.location.href = "./category";
                }
            })
            .catch((error) => console.log(error));
    };

    //logout function
    function logOut() {
        window.localStorage.clear();
        window.location.href = "./signin";
    };

    //submit category creation form
    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:8080/api/category/createcategory", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                name: name,
                subcategoryOf: selectedCategory,
                additionalAttributes: additionalAttributes,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 201) {
                    window.location.href = "./category";
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="admin-container">
                <Sidebar />
                <div className="main-content">
                    <header>
                        <div className="box">
                            <img src={menu} alt="Menu" />
                            <span>Category</span>
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
                                    <div className="title"> Create new category</div>
                                    <form>
                                        <div className="category-details">
                                            <div className="input-field">
                                                <span className="details">Category's name</span>
                                                <input type="text" placeholder="Enter category's name" required onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="category-details">
                                            <div className="input-field">
                                                <span className="details">Sub-category of:</span>
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
                                                        <input type="text" placeholder="Enter attribute's name" required value={attribute.name} onChange={(e) => handleAttributeName(e, index)} />
                                                    </div>
                                                    <div className="input-field">
                                                        {additionalAttributes.length > 0 &&
                                                            (
                                                                <button className="button" onClick={() => handleRemoveAttribute(index)}>
                                                                    <span>Remove</span>
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                        <button className="button" onClick={handleAddAttribute}>
                                            <span>+ Add more attributes</span>
                                        </button>
                                        <div className="button">
                                            <input type="submit" value="Create" onClick={(e) => handleSubmit(e)} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        <div className="category-management">
                            <div className="category">
                                <div className="card">
                                    <div className="card-header">
                                        <h2>Categories Management</h2>
                                        <button onClick={handleShowForm}>+ Create</button>
                                    </div>

                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td>ID</td>
                                                        <td>Name</td>
                                                        <td>Number of subcategories</td>
                                                        <td>Subcategories of</td>
                                                        <td>Number of product</td>
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