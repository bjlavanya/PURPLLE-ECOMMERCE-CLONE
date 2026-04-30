import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fragrance, } from "./AllProducts";
import BudgetBeautyProducts from "./BudgetBeautyProducts";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import PurplleNotices from "./PurplleNotices";
import Footer from "./Footer";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

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

function Offer() {
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
                    <img src="images/offer.webp" alt="Home1" />
                </section>
            </main>

            <main className="herosection">
                <section className="home" style={{ marginTop: '-25px' }}>
                    <img src="images/offerhero.webp" alt="Home1" />
                </section>
            </main>

            <main className="herosection">
                <section className="home" style={{ marginTop: 'auto' }}>
                    <img src="images/offer-deal.avif" alt="Home1" />
                </section>
            </main>

            <main className="herosection">
                <section className="home" style={{ marginTop: '-auto' }}>
                    <img src="images/offer-featured.webp" alt="Home1" />
                </section>
            </main>

            <main className="handpicked">
                <section className="handpickedImage">
                    <Slider {...settings}>
                        {products && products.slice(50, 66).map((product) => (
                            <div className="sponsored" key={product.id}>
                                <Link to={`/singleProductPage/${product._id}`}>
                                    <img src={product.productImage} alt={product.productName} />
                                </Link>

                                <div className="productInfos"  style={{paddingTop:'20px'}}>
                                    <h5 style={{ marginTop: '-10px' }}>{product.productName} </h5>
                                    <h5 style={{ marginTop: '-22px' }}>{product.productDescription.substr(0,50) + "...."}</h5>
                                    <h4>₹{product.newPrice} <strike>₹{product.oldPrice}</strike> <span>{product.discount}% off</span></h4>
                                </div>

                            </div>
                        ))}

                    </Slider>
                </section>
            </main>

            <BudgetBeautyProducts />
            <PurplleNotices />
            <Footer />
        </>
    );
}

export default Offer;
