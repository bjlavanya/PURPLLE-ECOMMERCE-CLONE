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
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const address = user?.address?.[0]
  const userId = localStorage.getItem("userId");


  useEffect(() => {
    if (userId) {
      axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/manageOrders/${userId}`)
        .then(res => setOrders(res.data))
        .catch(err => console.log(err))
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/manageUsers/${userId}`)
        .then(res => setUser(res.data))
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

  const back = () => {
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
              <button onClick={back}><FaArrowLeft className="arrow-left" /></button>
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
                      <>
                        <div className="your-order-section" key={order._id}>
                          <div className="product-details-img">

                            <div className="userorder-details">
                              <div className="order-id-date">
                                <p className="order-id">Order ID : <b>ORD{order._id.substr(15,)}</b> </p>
                                <p className="order-date">Order Date:{formattedOrderDate}</p>
                              </div>

                              <div className="user-order-status">
                                <p className="orderstatus">Order Status:</p>
                                <p>{order.orderStatus}</p>
                              </div>

                              <div className="payment-details">
                                <p className="total">Total Amount: {order.totalAmount}</p>
                                <p className="payment-mode">Payment: {order.paymentMode}</p>
                              </div>
                            </div>

                            <div className="line-section"></div>

                            <div className="products-ordered-list">
                              <div className="ordered-heading">
                                <div className="product-header">
                                  <p>Prodcuts ({order.products.length} items)</p>
                                </div>
                                <div className="view-details-product">
                                  <p onClick={() => viewProducts(order.products)}>View Details</p>
                                </div>
                              </div>

                              <div className="product-delivery-details">
                                <div className="products-list">
                                  <div className="product-image">
                                    <img src={order.products[0].productImage} alt="" />
                                  </div>

                                  <div className="products-details">
                                    <p className='product-name'>{order.products[0].productName}</p>
                                    <p>Qty: {order.products[0].quantity}</p>
                                    <p className="view-all" onClick={() => viewProducts(order.products)}>View All</p>
                                  </div>
                                </div>



                                <div className="deliver-address-list">
                                  <div className="flex-line"></div>
                                  <div className="address-list">
                                    <p className="address-header">Delivery Address</p>
                                    <p className="name">{user?.username}</p>
                                    <p className="number">MOB: {user?.phonenumber}</p>
                                    <p className="address">{address.location}, {address.city}, {address.state} - {address.pincode}</p>
                                  </div>

                                </div>
                              </div>

                            </div>

                          </div>
                        </div>
                        <div className="line"><hr /></div>
                      </>
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