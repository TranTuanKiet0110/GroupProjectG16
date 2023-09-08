import React from 'react'
// import Header from '../components/Header'
import "../css/admin.css";
import Sidebar from '../components/Sidebar';
import menu from '../img/menu.png';
import admin from '../img/admin.png';
import { useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';

export async function loaderForCategory() {
    const res = await fetch("http://localhost:8080/api/category/getallcategory");
    const categories = await res.json();
    return categories;
}

export default function AdminCategory() {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [additionalAttributes, setAdditionalAttributes] = useState([{ name: "", value: "" }]);

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

    const categories = useLoaderData();
    const data = categories && categories.data.map((category, index) =>
        <React.Fragment key={index + 1}>
            <tr>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>0</td>
            </tr>
        </React.Fragment>
    );

    const dataForSelector = categories && categories.data.map((category, index) =>
        <React.Fragment key={index + 1}>
            <option value={category.name}>{category.name}</option>
        </React.Fragment>
    );

    function handleShowForm() {
        setShowForm(!showForm);
    }

    function handleAddAttribute() {
        setAdditionalAttributes([...additionalAttributes, { name: "", value: null }])
    }

    function handleRemoveAttribute(index) {
        const list = [...additionalAttributes];
        list.splice(index, 1);
        setAdditionalAttributes(list);
    }

    function handleAttributeName(e, index) {
        const list = [...additionalAttributes];
        list[index].name = e.target.value;
        setAdditionalAttributes(list);
    }

    const handleSubmit = (e) => {
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
                additionalAttribute: additionalAttributes,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 201) {
                    //   alert("create successful");
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
                                            <div className="input-field">
                                                <span className="details">Sub-category of:</span>
                                                <select className="dropdown">
                                                    <option defaultValue="none">--None--</option>
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
                                                        {additionalAttributes.length > 1 &&
                                                            (
                                                                <button className="button" onClick={() => handleRemoveAttribute(index)}>
                                                                    <span>Remove</span>
                                                                </button>
                                                            )
                                                        }
                                                    </div>

                                                    {additionalAttributes.length - 1 === index &&
                                                        (
                                                            <button className="button" onClick={handleAddAttribute}>
                                                                <span>+ Add more attributes</span>
                                                            </button>
                                                        )
                                                    }
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
                                                        <td>Number of product</td>
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