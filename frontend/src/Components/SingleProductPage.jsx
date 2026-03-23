import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import PurplleNotices from "./PruplleNotices";
import Footer from "./Footer";

function SingleProductPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [id])

    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || []; 
        const existing = cart.find(item => item.productId === product._id); 
        if (existing)
        { 
            navigate("/addToCart");  
        } 
        else 
        { 
            cart.push({ productId: product._id, quantity: 1 }); 
        } 
        localStorage.setItem("cart", JSON.stringify(cart)); 
        navigate("/addToCart");
    }

    return (
        <>
            <Topbar />
            <Navbar />
            <div className="single-product-page">
                <div className="single-product-breadcrumbs">
                    <section className="breadcrumbs single-product">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li>{product.productName}</li>
                        </ul>
                    </section>
                </div>
                {product && (
                    <div className="single-product-details">
                        <div className="single-product-image">
                            <img src={`https://purplle-ecommerce-clone-backend.onrender.com/${product.productImage}`} alt="" />
                        </div>

                        <div className="single-product-description">
                            <h3 className="product-name">{product.productName}</h3>
                            <p className="product-description">{product.productDescription}</p>

                            <h4 className="price-details">
                                ₹{product.newPrice} <strike>₹{product.oldPrice}</strike> <span className="line">|</span> <span className="discount">Save ₹{product.oldPrice - product.newPrice} ({product.discount}% off)</span>
                            </h4>
                            <p className="product-taxes">
                                Inclusive of all taxes
                            </p>

                            <div className="quantity">
                                <h3>Quantity: {product.productQuantity}gm/ml</h3>
                            </div>

                            <div className="highlights">
                                <h3>Hightlights</h3>
                                <p className="highlights-details">{product.highlights}</p>
                            </div>

                            <Link to="/addToCart"  onClick={addToCart} className="product-buttons" style={{textDecoration:'none'}}>
                                <button className="cart">Add To Cart</button>
                            </Link>
                        </div>
                    </div>
                )}

            </div>
            <PurplleNotices />
            <Footer />
        </>
    )
}

export default SingleProductPage