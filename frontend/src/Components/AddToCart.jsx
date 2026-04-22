import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Login from './Login'
import axios from 'axios'
import SearchModal from "./SearchModal";
import { CiFaceSmile } from "react-icons/ci";
import { PiPackageLight } from "react-icons/pi";
import { IoIosLogIn } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPackage } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { BsCashStack } from "react-icons/bs";
import { CiBank } from "react-icons/ci";

function AddToCart() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const [searchModal, setSearchModal] = useState(false)
    const location = useLocation();
    const [loginFromCheckout, setLoginFromCheckout] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const [user, setUser] = useState({})
    const address = user?.address?.[0]

    const userId = localStorage.getItem("userId");
    const [cartItems, setCartItems] = useState([])

    //submenu
    const [open, setOpen] = useState(false);
    const subMenuRef = useRef()
    const menuRef = useRef()

    useEffect(() => {
        let handler = (e) => {
            if (menuRef.current && subMenuRef.current && !menuRef.current.contains(e.target) && !subMenuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    })

    //showing payment modal
    useEffect(() => {
        if (location.state?.openPayment) {
            setShowPaymentModal(true);
        }
    }, [location.state]);

    useEffect(() => {
        if (userId) {
            axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/manageUsers/${userId}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err))
        }
    }, [userId])

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const fetchProducts = async () => {
            let data = [];

            for (const item of cart) {
                const res = await axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/products/${item.productId}`);
                data.push({ ...res.data, quantity: item.quantity });
            }

            setCartItems(data);
        };

        fetchProducts();
    }, []);

    const closeModal = () => {
        return setShowModal(false);
    }

    const closeSearchModal = () => {
        return setSearchModal(false);
    }

    const handleLogout = () => {
        localStorage.removeItem("userId")
        localStorage.removeItem('cart')
        window.location.reload()
    }

    const continueShopping = () => {
        navigate('/')
    }

    //Adding user quantity to cart - local storage
    const quantity = (index, qunty) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart[index].quantity = Number(qunty);
        localStorage.setItem("cart", JSON.stringify(cart));

        const updatedItems = [...cartItems];
        updatedItems[index].quantity = Number(qunty);
        setCartItems(updatedItems);
    }

    const removeCartItem = (index) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = cart.filter((item, i) => i !== index);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        const updatedItems = cartItems.filter((item, i) => i !== index);
        setCartItems(updatedItems);
    }

    //Calcultaion
    const totalMRP = cartItems.reduce((total, item) => {
        return total + Number(item.oldPrice) * item.quantity
    }, 0)

    const subTotal = cartItems.reduce((total, item) => {
        return total + Number(item.newPrice) * item.quantity
    }, 0)

    const saving = totalMRP - subTotal
    const platformFee = 5
    const shipping = 25

    const orderTotal = subTotal + platformFee + shipping

    const placeAnOrder = async () => {
        const user = localStorage.getItem('userId')

        //if user not logged before placing order - then show login page
        if (!user) {
            setShowModal(true)
            return
        }

        if (!address?.pincode) {
            navigate('/userProfile/myAddressForm')
            return
        }

        try {
            const res = await axios.post("https://purplle-ecommerce-clone-backend.onrender.com/placeAnOrder", {
                userId: user,
                products: cartItems,
                totalAmount: orderTotal,
                paymentMode: 'Cash On Delivery',
                paymentId: null,
                paymentStatus: 'Pending'
            })

            await axios.post('https://purplle-ecommerce-clone-backend.onrender.com/sendGSTInvoice', {
                userId: userId
            })

            alert("Order placed successfully")
            navigate('/myOrders')
        }

        catch (err) {
            console.log("order failed: ", err)
        }

    }

    const payNow = async () => {
        const userId = localStorage.getItem("userId")

        if (!userId) {
            setShowModal(true)
            return
        }

        if (!address?.pincode) {
            navigate('/userprofile/myAddressForm')
            return
        }

        try {
            //create razorpay order
            const res = await axios.post('https://purplle-ecommerce-clone-backend.onrender.com/createOrder', {
                totalAmount: orderTotal
            })

            const { order, razorpayKeyId } = res.data

            // razorpay payment options
            const options = {
                key: razorpayKeyId,
                amount: order.amount,
                currency: 'INR',
                name: 'Purplle',
                description: 'Order Payment',
                order_id: order.id,

                handler: async function (response) {
                    try {
                        const verify = await axios.post('https://purplle-ecommerce-clone-backend.onrender.com/verifyPayment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: userId,
                            products: cartItems,
                            totalAmount: orderTotal
                        })

                        if (verify.data.success) {

                            await axios.post('https://purplle-ecommerce-clone-backend.onrender.com/sendGSTInvoice', {
                                userId: userId
                            })

                            alert('Payment Successfull and Invoice send to mail')
                            navigate('/myOrders')
                        }
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
            }

            // open razorpay popup
            const rzp = new window.Razorpay(options)
            rzp.open()
        }
        catch (err) {
            console.log(err)
        }
    }

    const proceedToPay = () => {
        const userId = localStorage.getItem("userId")

        if (!userId) {
            if (!address?.pincode) {
                setLoginFromCheckout(true)
            }
            setShowModal(true)
            return
        }

        if (!address?.pincode) {
            navigate('/userprofile/myAddressForm')
            return
        }

        setShowPaymentModal(true)
    }

    return (
        <>
            <nav>
                <div className="navbar">
                    <div className="logos">
                        <Link to="/"><img src="/images/purpllelogo.svg" alt="Puplle Logo" id="purplle" /></Link>
                        <img src="/images/elitelogo.gif" alt="Elite Logo" id="elite" style={{ marginLeft: "3px", width: 50 }} />
                    </div>

                    <div className="nav-icons">
                        <Link href="" id="search" onClick={() => setSearchModal(true)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Link>
                        {searchModal && <SearchModal closeSearchModal={closeSearchModal} />}
                        <a href="" id="heart"><i className="fa-regular fa-heart"></i></a>


                        <Link ref={menuRef} id="smile" onClick={() => setOpen(!open)}>
                            <i className="fa-regular fa-face-smile"></i>
                        </Link>

                        {
                            open &&
                            <div ref={subMenuRef} className="sub-menu-wrap" id="submenu">
                                <div className="sub-menu">
                                    <Link to='/userProfile' className="sub-menu-link" style={{ paddingTop: '8px' }} >
                                        <i><CiFaceSmile /></i>
                                        <p>My Account</p>
                                    </Link>

                                    <Link to='/userProfile' className="sub-menu-link" style={{ paddingTop: '8px' }} >
                                        <i><CiLocationOn /></i>
                                        <p>My Address</p>
                                    </Link>

                                    {
                                        userId ? (
                                            <Link to='/myOrders' href="#" className="sub-menu-link">
                                                <i><PiPackageLight /></i>
                                                <p>My Orders</p>
                                            </Link>

                                        ) : (
                                            <Link href="#" className="sub-menu-link" onClick={() => setShowModal(true)}>
                                                <i><PiPackageLight /></i>
                                                <p>My Orders</p>
                                            </Link>
                                        )
                                    }


                                    {userId ? (
                                        <Link href="#" className="sub-menu-link" onClick={handleLogout}>
                                            <i><IoIosLogIn /></i>
                                            <p>Logout</p>
                                        </Link>
                                    ) : (
                                        <Link href="#" className="sub-menu-link" onClick={() => setShowModal(true)}>
                                            <i><IoIosLogIn /></i>
                                            <p>Login or Register</p>
                                        </Link>
                                    )}
                                    {/* {showModal && <Login closeModal={closeModal} />} */}
                                </div>
                            </div>

                        }
                    </div>

                </div>
            </nav>

            <div className="add-to-cart-details">
                <div className="add-to-cart">

                    {cartItems.length === 0 ? (

                        <div className="no-items">
                            <img src="/images/noitemsCart.webp" alt="" />

                            <h4>There are no items in this cart.</h4>
                            <p>Let’s add some items to the cart to shop</p>

                            <button onClick={continueShopping}>
                                CONTINUE SHOPPING
                            </button>
                        </div>

                    ) : (

                        <>
                            <div className="my-cart">
                                <h2 className="my-cart-heading">
                                    <button onClick={continueShopping}><FaArrowLeft className="arrow-left" /></button>
                                    My Cart ({cartItems.length})
                                </h2>
                            </div>

                            {cartItems.map((item, index) => (

                                <div className="cart-items" key={index}>
                                    <div className="cart-image">
                                        <img src={item.productImage} alt="" />
                                    </div>

                                    <div className="cart-product-details">
                                        <h4 className="product-name">{item.productName}</h4>

                                        <p className="product-description">
                                            {item.productDescription}
                                        </p>

                                        <div className="price-details">
                                            <h5 className="new-price">₹{item.newPrice}</h5>
                                            <p className="old-price">{item.oldPrice}</p>
                                            <p className="discount">{item.discount}% off</p>

                                            <label>Qty:</label>

                                            <select className="quantity" value={item.quantity} onChange={(e) => quantity(index, e.target.value)}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>

                                        <button className="remove" onClick={() => removeCartItem(index)}>Remove</button>
                                    </div>
                                </div>

                            ))}

                            <div className="price-card">

                                <h3>Price Details</h3>

                                <div className="price-row">
                                    <span>Total MRP</span>
                                    <span>₹{totalMRP}</span>
                                </div>

                                <div className="price-row">
                                    <span>Saving on MRP</span>
                                    <span className="saving">₹{saving}</span>
                                </div>

                                <div className="price-row">
                                    <span>Sub Total</span>
                                    <span>₹{subTotal}</span>
                                </div>

                                <div className="price-row">
                                    <span>Platform Fee</span>
                                    <span>
                                        <span className="strike">₹15</span> ₹{platformFee}
                                    </span>
                                </div>

                                <div className="price-row">
                                    <span>
                                        Shipping and other charges
                                    </span>
                                    <span className="shipping">₹{shipping}</span>
                                </div>



                                <hr />

                                <div className="price-row total">
                                    <span>Order Total</span>
                                    <span>₹{orderTotal}</span>
                                </div>

                            </div>

                            <div className="space"></div>

                            <div className="payment-proceed">
                                <div className="price-info">
                                    <div className="amount">₹{orderTotal} <span className="save">YOU SAVE ₹{saving}</span></div>
                                </div>
                                <button className="pay-btn" onClick={proceedToPay}>Proceed To Pay</button>
                            </div>

                        </>

                    )}

                </div>
            </div>
            {showModal && <Login closeModal={closeModal} loginFromCheckout={loginFromCheckout} />}

            {showPaymentModal && userId && (
                <div className="checkout-section">
                    <div className="manage-table order-products checkout-content" style={{ marginTop: '250px' }}>
                        <div className="checkout-top-section">
                            <button className="close-btn" onClick={() => setShowPaymentModal(false)}>X</button>
                            <h3 className='modal-product-heading checkout-heading'>Checkout</h3>
                        </div>

                        <div className="hr-line" style={{ background: '#cec9c9' }}></div>
                        <div className="hr-line" style={{ background: '#cec9c9' }}></div>

                        <div className="checkout-details">
                            <div className="checkout-deliver-to">
                                <div className="deliver-address">
                                    <div className="deliver-head-icon">
                                        <FaLocationDot className="location-icon" />
                                        <p className="deliver-to-heading">Deliver To:</p>
                                    </div>
                                </div>

                                <div className="hr-line" style={{ background: '#cec9c9' }}></div>

                                <div className="address-details">
                                    <p className="username">{user?.username}</p>
                                    <p className="phonenumber">{user?.phonenumber}</p>
                                    <p className="location">{address.location}, {address.city}, {address.state} - {address.pincode}</p>
                                </div>
                            </div>

                            <div className="hr-line" style={{ background: '#cec9c9' }}></div>
                            <div className="hr-line" style={{ background: '#cec9c9' }}></div>

                            <div className="order-summary">
                                <div className="order-summary-heading">
                                    <BiSolidPackage className="package-icon" />
                                    <p>Order Summary</p>
                                </div>

                                <div className="hr-line" style={{ background: '#cec9c9' }}></div>

                                <div className="order-details">
                                    <p>Total Items: <b>{cartItems.length}</b></p>
                                    <p>Total Amount: <b>₹{orderTotal}</b></p>
                                </div>
                            </div>

                            <div className="hr-line" style={{ background: '#cec9c9' }}></div>
                            <div className="hr-line" style={{ background: '#cec9c9' }}></div>

                            <div className="payment-mode">
                                <div className="payment-mode-heading">
                                    <MdOutlinePayment className="payment-icon" />
                                    <p>Select Payment Mode</p>
                                </div>

                                <div className="hr-line" style={{ background: '#cec9c9' }}></div>


                                <div className="payment-selection">
                                    <div className="cash-on-delivery">
                                        <div className="COD-heading">
                                            <BsCashStack className="cash-icon" />
                                            <p>Cash On Delivery</p>
                                        </div>
                                        <p className="COD-desp">Pay when your order is delivered</p>
                                        <button className="COD-btn" onClick={placeAnOrder}>Place An Order</button>
                                    </div>

                                    <div className="cash-on-delivery">
                                        <div className="COD-heading">
                                            <CiBank className="cash-icon" />
                                            <p>Net Banking / Online Payment</p>
                                        </div>
                                        <p className="COD-desp">Pay securely using online payment method</p>
                                        <button className="COD-btn" onClick={payNow}>Pay Now</button>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default AddToCart