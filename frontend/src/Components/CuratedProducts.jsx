import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {fragrance, } from "./AllProducts";

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

function CuratedProducts() {

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
    <main className="handpicked">
      <section className="headings">
        <h4 className="handpickedHeading" >CURATED FOR YOU</h4>
        <h5 className="view-all">View ALL <i className="fa-solid fa-arrow-right"></i></h5>
        <p className="sponsored">Sponsored</p>
      </section>

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
                        <h5 style={{marginTop:'-10px'}}>{product.title} </h5>
                        <h5 style={{marginTop:'-22px'}}>{product.subtitle}</h5>
                        <h4>₹{product.price} <strike>₹{product.oldPrice}</strike> <span>{product.discount}% off</span></h4>
                    </div>

                    <div className="cart">
                        <h3>Add to Cart</h3>
                    </div>
                </div>
            ))}

        </Slider>
      </section>
    </main>
  );
}

export default CuratedProducts;
