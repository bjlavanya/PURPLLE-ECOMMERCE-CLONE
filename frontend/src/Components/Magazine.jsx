import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { magazineBlogs } from "./AllProducts";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import PurplleNotices from "./PruplleNotices";
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

function Magazine() {
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

  const products = [
    {
        id: 1,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/handpicked1.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 2,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/handpicked2.avif",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 3,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/handpicked3.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 4,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/handpicked4.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 5,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/handpicked5.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 0,
    },
    {
        id: 6,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/handpicked3.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
  ];

    return(
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
                        {products.map((product) => (
                            <div className="sponsored" key={product.id}>
                                <a href="#">
                                    <img src={product.image} alt={product.title} />
                                </a>

                                <div className="offers">
                                    <h3>{product.offers} offers</h3>
                                </div>
                                
                                <div className="productInfos">
                                <h5 style={{marginTop:'-10px'}}>{product.title} </h5>
                                <h5 style={{marginTop:'-22px'}}>{product.subtitle}</h5>
                                <h4>₹{product.price} <strike>₹{product.oldPrice}</strike> <span>{product.discount}% off</span></h4>
                                </div>
                            </div>
                        ))}

                    </Slider>
                </section>
            </main>

            <section className="topHighlights">
                <section className="headings">
                    <h4 className="handpickedHeading">Our Latest Highlights</h4>
                </section>
                <section className="topHighlightsImages">
                    <img src="/images/magazine-highlights1.webp" alt="" />
                    <img src="/images/magazine-highlights2.webp" alt="" />
                    <img src="/images/magazine-highlights2.webp" alt="" />

                </section>
            </section>

            <main className="handpicked">
                <section className="headings">
                    <h4 className="handpickedHeading" style={{paddingBottom:'40px'}}>TREADING BLOG ARTICLES</h4>
                </section>

                <section className="handpickedImage">
                    <Slider {...settings}>
                        {magazineBlogs.map((product) => (
                            <div className="sponsored" key={product.id}>
                                <a href="#">
                                    <img src={product.image} alt={product.title}  style={{height:'220px', width:'248px', marginTop: 'auto'}}/>
                                </a>
                            </div>
                        ))}

                    </Slider>
                </section>
            </main>

            <PurplleNotices />
            <Footer />
        </>
    );
}

export default Magazine;
