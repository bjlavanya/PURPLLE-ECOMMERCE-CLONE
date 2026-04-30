import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import PurplleNotices from "./PurplleNotices";
import Footer from "./Footer";
import axios from 'axios'

function NewFeatured() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("https://purplle-ecommerce-clone-backend.onrender.com/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Topbar />
            <Navbar />
            <section className="breadcrumbs">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/offer">Offers</Link></li>
                    <li>New Launches at Purplle</li>
                </ul>
            </section>

            <section className="new-featured">
                <h1>New Launches At Purplle 1</h1>

                <h4>Shop All products</h4>

                <div className="goodvibesImages">
                    <div className="featured-grid-container">
                        {products && products.slice(-70, 33).map((product) => (
                            <div className="sponsored" key={product.id}>
                                <Link to={`/singleProductPage/${product._id}`}>
                                    <img src={product.productImage} alt={product.productName} />
                                </Link>

                                <div className="productInfos" style={{ paddingTop: '2px' }}>
                                    <h5 style={{ marginTop: '10px' }}>{product.productName} </h5>
                                    <h5 style={{  width: '225px' }}>{product.productDescription.substr(0, 50) + "...."}</h5>
                                    <h4 style={{ marginLeft: '-100px' }}>₹{product.newPrice} <strike>₹{product.oldPrice}</strike> <span>{product.discount}% off</span></h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <PurplleNotices />
            <Footer />
        </>
    );
}

export default NewFeatured;
