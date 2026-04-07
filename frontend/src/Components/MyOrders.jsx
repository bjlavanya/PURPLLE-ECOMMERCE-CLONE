import React, { useEffect, useState } from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import { FaArrowLeft } from "react-icons/fa6";
import axios from 'axios'
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])

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
    navigate('/')
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
            {/* <div className="no-my-orders-section">
              <img src="/images/no-order-img.png" alt="" />
            </div>

            <div className="ordering-empty-section">
              <p className="main-heading">Currently there are no orders in your account.</p>
              <p className="sub-heading">Let us go shopping!</p>
              <button>Shop Now</button>
            </div> */}

            {
              orders.map((order, index) => (
                <div className="your-order-section" key={order._id}>
                  <div className="product-details-img">
                    <img src={order.products[0].productImage} alt="" />

                    <div className="order-product-details">
                      <p className="order-id" style={{ fontWeight: '500' }}>Order ID: ORD{order._id.substr(15,)}</p>
                      <p className="productname"> {order.products[0].productName} + ({order.products.length - 1} items)</p>
                      <p className="order-date">Order Date: 2026-03-27</p>
                      <button>View All</button>
                    </div>

                  </div>
                  <p className="total-amount">₹{order.totalAmount}</p>

                  <div className="order-status">
                    <p className="status">Status:</p>
                    <p>{order.orderStatus}</p>
                  </div>

                </div>

              ))
            }


          </div>
        </div>
      </div>

      {/* <div className="modal-product-details">
        <div className="modal-content manage-table order-products">
          <button className="close-btn">X</button>
          <h3 className='modal-product-heading'>Ordered Products</h3>

          <div className="product-list">

            <div className="product-card">
              <img src="/images/bestsellers3.webp" className="product-img" />
              <div className="product-info">
                <h4 className="product-name">jfdkdjkd</h4>
                <p className="product-price">Price: ₹800</p>
                <p className="product-qty">Quantity: 2</p>
              </div>
            </div>

            <div className="product-card">
              <img src="/images/bestsellers3.webp" className="product-img" />
              <div className="product-info">
                <h4 className="product-name">jfdkdjkd</h4>
                <p className="product-price">Price: ₹800</p>
                <p className="product-qty">Quantity: 2</p>
              </div>
            </div>

          </div>

        </div>
      </div> */}
    </>
  )
}

export default MyOrders