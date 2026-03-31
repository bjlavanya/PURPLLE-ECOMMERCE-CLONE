import React, { useEffect, useState, useRef } from 'react'
import AdminSidebars from './AdminSidebars'
import axios from 'axios'
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

function ManageProducts() {
  const inputRef = useRef(null);
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    axios.get("https://purplle-ecommerce-clone-backend.onrender.com/manageProducts")
      .then(products => setProducts(products.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`https://purplle-ecommerce-clone-backend.onrender.com/deleteProducts/${id}`)
    alert("Product Deleted")
    window.location.reload()
  }

  const handleSearch = async (e) => {
    const value = e.target.value
    setQuery(value)
    if (value === "") {
      axios.get("https://purplle-ecommerce-clone-backend.onrender.com/manageProducts")
        .then(products => setProducts(products.data))
        .catch(err => console.log(err))
    }
    else {
      try {
        const res = await axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/search?q=${value}`)
        setProducts(res.data.products)
      }
      catch (error) {
        console.log(error)
      }
    }

  }

  return (
    <>
      <AdminSidebars />

      <div className="admin-all-content-space">
        <div className="manage-table">
          <div className="manage-table-headings">
            <h3>Manage Product Details</h3>

            <div className="admin-search-products">
              <input type="text" className="search-bar" id="search-bar" placeholder='Search products' ref={inputRef} value={query} onChange={handleSearch} />
              <BsSearch className="search-icon" />
            </div>
          </div>

          <div className="table-container">
            <table border="1">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>New Price</th>
                  <th>Old Price</th>
                  <th>Discount</th>
                  <th>Quantity</th>
                  <th>Highlights</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {
                  products.map(product => {
                    return <tr key={product._id}>
                      <td><img src={product.productImage} alt="" /></td>
                      <td>{product.productName}</td>
                      <td>{product.productDescription}</td>
                      <td>{product.newPrice}</td>
                      <td>{product.oldPrice}</td>
                      <td>{product.discount}</td>
                      <td>{product.productQuantity}</td>
                      <td>{product.highlights}</td>
                      <td>{product.category}</td>
                      <td className='action-btn'>
                        <Link to={`/admin/editProducts/` + product._id} ><i className="fas fa-edit edit"></i></Link><br />
                        <button onClick={() => deleteProduct(product._id)}><i className="fas fa-trash-alt delete"></i></button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageProducts