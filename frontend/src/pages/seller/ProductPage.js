import React, { useState, useEffect } from "react";
//import { useParams } from 'react-router-dom';
import "../../css/productpage.css";
import Navbar from "../../components/Navbar";

function ProductPage1() {

  return (
    <div class="productpage">
      <Navbar />
      <div class="container-wrapper">
        <div class="container">
          <div class="title">Add Product</div>
          <form action="#">
            <div class="user__details">
              <div class="input__box">
                <span class="details">Name</span>
                <input type="text" placeholder="E.g: product1" required></input>
              </div>
              <div class="input__box">
                <span class="details">Description</span>
                <input type="text" placeholder="Description" name="description" required></input>
              </div>
              <div class="input__box">
                <span class="details">Price</span>
                <input type="number" placeholder="1200" name="price" required></input>
              </div>
              <div class="input__box">
                <span class="details">Key: Value</span>
                <input type="text" placeholder="Key: Value" required></input>
                <button class="second-button" >Add</button>
              </div>
            </div>
            <select
              name="category">
              <option value={0}>Select Category</option>

            </select>
            <div class="button">

            </div>
          </form>
        </div>
      </div>

      <div className="filterandsort">
        {/* Filter input */}
        <input
          className="filter"
          type="text"
          placeholder="Filter by Product Name" />

        {/* Sort order selection */}
        <select
          className="sort"
          name="sortOrder">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table class="rwd-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date Add</th>
            <td></td>
            <th>Category</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          
        </tbody>
      </table>
    </div>
  );
}

export default ProductPage1;