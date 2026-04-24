import React from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import { skincare, } from "./AllProducts";
import { Link } from "react-router-dom";
import PurplleNotices from './PurplleNotices';
import Footer from './Footer';

function Skincare() {
    return (
        <>
            <Topbar />
            <Navbar />

            <section className="breadcrumbs" style={{marginTop:'5px'}}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>Skincare</li>
                </ul>
            </section>

            <div className="shop-category-skincare search-page">
                <div className="skincare-herosection">
                    <img src="/images/herosection11.webp" alt="" />
                </div>

                <div className="shop-skincare">
                    <p>Skincare</p>
                </div>

                <div className="search-product-list ">
                    {skincare.map((product) => (
                        <Link className="product-list" >
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

export default Skincare