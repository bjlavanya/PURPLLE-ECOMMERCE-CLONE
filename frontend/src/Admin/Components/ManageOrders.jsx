import React, { useEffect, useState } from 'react'
import AdminSidebars from './AdminSidebars'
import axios from 'axios'
import { Link } from "react-router-dom";

function ManageOrders() {
  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [user, setUser] = useState({})
  const [addresses, setAddresses] = useState({})

  useEffect(() => {
    axios.get("https://purplle-ecommerce-clone-backend.onrender.com/manageOrders")
      .then(orders => setOrders(orders.data))
      .catch(err => console.log(err))
  }, [])


  useEffect(() => {
    orders.forEach((order) => {
      axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/manageOrderAddress/${order.userEmail}`)
        .then(res => {
          setAddresses(prev => ({
            ...prev,
            [order.userEmail]: res.data.address[0]
          }))
        })
        .catch(err => console.log(err))

    })
  }, [orders])

  const viewProducts = (products) => {
    setSelectedProducts(products)
    setShowModal(true)
  }

  const deleteOrders = async (id) => {
    axios.delete(`https://purplle-ecommerce-clone-backend.onrender.com/deleteOrders/${id}`)
    alert("Orders Deleted")
    window.location.reload();
  }

  return (
    <>
      <AdminSidebars />

      <div className="admin-all-content-space">
        <div className="manage-table">
          <h3>Manage Order Details</h3>

          <div className="table-container">
            <table border="1">
              <thead style={{position:'sticky', top:0, zIndex:1000}}>
                <tr>
                  <th>Sl.No</th>
                  <th>User Email</th>
                  <th>User Address</th>
                  <th>Order Date</th>
                  <th>Product Details</th>
                  <th>Total Amount</th>
                  <th>Payment Mode</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {
                  orders.map((order, index) => {
                    const date = new Date(order.orderDate)
                    const formattedOrderDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`
                    return <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order.userEmail}</td>
                      <td>{addresses[order.userEmail]?.location}</td>
                      <td>{formattedOrderDate}</td>
                      <td className='click' onClick={() => viewProducts(order.products)}>Click to View Products</td>
                      <td>{order.totalAmount}</td>
                      <td>{order.paymentMode}</td>
                      <td>{order.paymentStatus}</td>
                      <td>{order.orderStatus}</td>
                      <td className='action-btn'>
                        <Link to={`/admin/editStatus/` + order._id} ><i className="fas fa-edit edit"></i></Link> <br />
                        <button onClick={() => deleteOrders(order._id)}><i className="fas fa-trash-alt delete"></i></button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {
        showModal && (

          <div className="modal-product-details">
            <div className="modal-content manage-table">
              <button className="close-btn" onClick={() => setShowModal(false)}>
                X
              </button>

              <h3>Ordered Products</h3>
              <div className="table-scroll">
                <table border="1">

                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      selectedProducts.map((product, index) => (
                        <tr key={index}>

                          <td>
                            <img
                              src={product.productImage}
                              width="50"
                            />
                          </td>

                          <td>{product.productName}</td>
                          <td>₹{product.newPrice}</td>
                          <td>{product.quantity}</td>

                        </tr>
                      ))
                    }

                  </tbody>
                </table>
              </div>

            </div>

          </div>

        )
      }

    </>
  )
}

export default ManageOrders