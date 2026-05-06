import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import PurplleNotices from "./PurplleNotices";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

function NextArrow({ onClick }) {
    return (
        <div className="custom-arrow right" onClick={onClick}>
            <FaChevronRight />
        </div>
    );
}

function PrevArrow({ onClick }) {
    return (
        <div className="custom-arrow left" onClick={onClick}>
            <FaChevronLeft />
        </div>
    );
}

function Magazine() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("https://purplle-ecommerce-clone-backend.onrender.com/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [])

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };


    return (
        <>
            <Topbar />
            <Navbar />
            <main className="herosection">
                <section className="home">
                    <img src="/images/magazineimg.webp" alt="Home1" className="splurgeImage" />
                </section>
            </main>

            <main className="handpicked">
                <section className="headings">
                    <h4 className="handpickedHeading">TODAY'S BEST DEALS FOR YOU</h4>
                    <h5 className="view-all">View ALL <i className="fa-solid fa-arrow-right"></i></h5>
                </section>

                <section className="handpickedImage">
                    <Slider {...settings}>
                        {products && products.filter((product) => product.category === 'Best Sellers').map((product) => (
                            <div className="sponsored" key={product._id}>
                                <Link to={`/singleProductPage/${product._id}`}>
                                    <img src={product.productImage} alt={product.productName} />
                                </Link>

                                <div className="productInfos" style={{paddingTop:'20px'}}>
                                    <h5 style={{ marginTop: '-10px' }}>{product.productName} </h5>
                                    <h5 style={{ marginTop: '-22px' }}>{product.productDescription.substr(0,50)+"...."}</h5>
                                    <h4>₹{product.newPrice} <strike>₹{product.oldPrice}</strike> <span>{product.discount}% off</span></h4>
                                </div>
                            </div>
                        ))}

                    </Slider>
                </section>
            </main>

            <section className="topHighlights">
                <section className="headings">
                    <h4 className="handpickedHeading">Our Latest Highlights - Products</h4>
                </section>
                <section className="topHighlightsImages">
                    <Link to="/shopCategories/sunscreen" className="splurge1">
                        <img src="/images/magazine-highlights1.webp" alt="" />
                    </Link>

                    <Link to="/shopCategories/haircare" className="splurge1">
                        <img src="/images/magazine-highlights2.webp" alt="" />
                    </Link>

                    <Link to="/shopCategories/skincare" className="splurge1">
                        <img src="/images/magazine-highlights3.webp" alt="" />
                    </Link>


                </section>
            </section>

            <PurplleNotices />
            <Footer />
        </>
    );
}

export default Magazine;
