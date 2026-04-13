import React, { useEffect, useState } from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import { FaArrowLeft } from "react-icons/fa6";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const navigate =  useNavigate()

  const userId = localStorage.getItem("userId");


  useEffect(() => {
    if (userId) {
      axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/manageOrders/${userId}`)
        .then(res => setOrders(res.data))
        .catch(err => console.log(err))
    }
  }, [userId])

  const viewProducts = (products) => {
    setSelectedProducts(products)
    setShowModal(true)
  }

  const continueShopping = () => {
    navigate(-1)
  }
  return (
    <>
      <Topbar />
      <Navbar />

      <div className="my-orders-section">
        <div className="my-order-details">
          <div className="my-orders">
            <h2 className="my-orders-heading">
              <button onClick={continueShopping}><FaArrowLeft className="arrow-left" /></button>
              My Orders
            </h2>

            <div className="line"><hr /></div>

            {orders.length === 0 ? (
              <>
                <div className="no-my-orders-section">
                  <img src="/images/no-order-img.png" alt="" />
                </div>

                <div className="ordering-empty-section">
                  <p className="main-heading">Currently there are no orders in your account.</p>
                  <p className="sub-heading">Let us go shopping!</p>
                  <button onClick={continueShopping}>Shop Now</button>
                </div>
              </>
            ) : (
              <>

                {
                  orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map((order, index) => {
                    const date = new Date(order.orderDate)
                    const formattedOrderDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`

                    return (
                      <div className="your-order-section" key={order._id}>
                        <div className="product-details-img">
                          <img src={order.products[0].productImage} alt="" />

                          <div className="order-product-details">
                            <p className="order-id" style={{ fontWeight: '500' }}> Order ID: ORD{order._id.substr(15,)} </p>

                            <p className="productname"> {order.products[0].productName} (+{order.products.length - 1} items) </p>

                            <p className="order-date"> Order Date: {formattedOrderDate} </p>

                            <button onClick={() => viewProducts(order.products)}> View All </button>
                          </div>
                        </div>

                        <p className="total-amount">₹{order.totalAmount}</p>

                        <div className="order-status">
                          <p className="status">Status:</p>
                          <p>{order.orderStatus}</p>
                        </div>
                      </div>
                    )
                  })
                }

              </>
            )}


          </div>
        </div>
      </div>

      {
        showModal && (
          <div className="modal-product-details">
            <div className="modal-content manage-table order-products">
              <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
              <h3 className='modal-product-heading'>Ordered Products</h3>

              <div className="product-list">
                {
                  selectedProducts.map((product, index) => (
                    <div className="product-card" key={index}>
                      <img src={product.productImage} className="product-img" />
                      <div className="product-info">
                        <h4 className="product-name">{product.productName}</h4>
                        <p className="product-price">Price: ₹{product.newPrice}</p>
                        <p className="product-qty">Quantity: {product.quantity}</p>
                      </div>
                    </div>
                  ))
                }

              </div>

            </div>
          </div>
        )
      }

    </>
  )
}

export default MyOrders