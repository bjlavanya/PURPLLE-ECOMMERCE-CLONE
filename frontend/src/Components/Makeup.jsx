import React from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import {curatedProducts, } from "./AllProducts";
import { Link } from "react-router-dom";
import PurplleNotices from './PurplleNotices';
import Footer from './Footer';

function Makeup() {
    return (
        <>
            <Topbar />
            <Navbar />

            <div className="shop-category-skincare search-page">
                <div className="shop-skincare">
                    <p>Makeup</p>
                </div>

                <div className="search-product-list ">
                    {curatedProducts.map((product) => (
                        <Link  className="product-list" >
                            <div className="product-image">
                                <img src={product.image} alt={product.title} />
                            </div>

                            <div className="product-details">
                                <p className="product-name">{product.title}  </p>

                                <p className="product-descriptiom">{product.subtitle}</p>

                                <div className="price-section">
                                    <span className="price">₹{product.price} </span>
                                    <span className="old-price">₹{product.oldPrice} </span>
                                    <span className="discount">{product.discount}% off</span>
                                </div>

                                <button className="add-cart">
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>

            <PurplleNotices />
            <Footer />
        </>
    )
}

export default Makeup