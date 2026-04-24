import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fragnance, } from "./AllProducts";
import BudgetBeautyProducts from "./BudgetBeautyProducts";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import PurplleNotices from "./PurplleNotices";
import Footer from "./Footer";

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
                        {fragrance.map((product) => (
                            <div className="sponsored" key={product.id}>
                                <a href="#">
                                    <img src={product.image} alt={product.title} />
                                </a>

                                <div className="offers">
                                    <h3>{product.offers} offers</h3>
                                </div>

                                <div className="productInfos">
                                    <h5 style={{ marginTop: '-10px' }}>{product.title} </h5>
                                    <h5 style={{ marginTop: '-22px' }}>{product.subtitle}</h5>
                                    <h4>₹{product.price} <strike>₹{product.oldPrice}</strike> <span>{product.discount}% off</span></h4>
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
