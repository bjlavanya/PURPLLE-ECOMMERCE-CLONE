import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Login from './Login'
import axios from 'axios'

function AddToCart() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    // const userEmail = JSON.parse(localStorage.getItem('userEmail'))
    const userId = localStorage.getItem("userId");

    const [cartItems, setCartItems] = useState([])

    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const cartItemsCount = cart.length

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const fetchProducts = async () => {
            let data = [];

            for (const item of cart) {
                const res = await axios.get(`http://127.0.0.1:3001/products/${item.productId}`);
                data.push({ ...res.data, quantity: item.quantity });
            }

            setCartItems(data);
        };

        fetchProducts();
    }, []);

    const closeModal = () => {
        return setShowModal(false);
    }

    const handleLogout = () => {
        localStorage.removeItem("userId")
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
        const cart = cartItems.filter((item, i) => i !== index)
        setCartItems(cart)
        localStorage.setItem("cart", JSON.stringify(cart))
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

        try {
            const res = await axios.post("http://127.0.0.1:3001/placeAnOrder", {
                userId: user,
                products: cartItems,
                totalAmount: orderTotal
            })

            alert("Order placed successfully")
        }

        catch (err) {
            console.log("order failed: ", err)
        }

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
                        <a href="" id="search"><i className="fa-solid fa-magnifying-glass"></i></a>
                        <a href="" id="heart"><i className="fa-regular fa-heart"></i></a>
                        <Link to='/addToCart' href="" id="bars">
                            <i class="fa-solid fa-cart-arrow-down"></i>
                            {cartItemsCount > 0 &&
                                <span className="cart-item-length">{cartItemsCount}</span>
                            }
                        </Link>

                        {userId ? (
                            <Link id="smile" onClick={handleLogout}>
                                <i className="fa-regular fa-face-smile"></i>
                                <span className="tooltiptext">Logout</span>
                            </Link>
                        ) : (

                            <Link id="smile" onClick={() => setShowModal(true)}>
                                <i className="fa-regular fa-face-smile"></i>
                                <span className="tooltiptext">Login or Register</span>
                            </Link>
                        )}
                        {showModal && <Login closeModal={closeModal} />}
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
                                        <img src={`http://localhost:3001/${item.productImage}`} alt="" />
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
                                <button className="pay-btn" onClick={placeAnOrder}>Place an Order</button>
                            </div>

                        </>

                    )}

                </div>
            </div>

        </>
    )
}

export default AddToCart