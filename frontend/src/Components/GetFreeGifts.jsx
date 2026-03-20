import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getfreegifts, } from "./AllProducts";

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

function GetFreeGifts() {

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
        <h4 className="handpickedHeading" >FREE GIFT OFFERS</h4>
      </section>

      <section className="handpickedImage">
        <Slider {...settings}>
            {getfreegifts.map((product) => (
                <div className="sponsored" key={product.id}>
                    <a href="#">
                        <img src={product.image} alt={product.title} />
                    </a>
                </div>
            ))}

        </Slider>
      </section>
    </main>
  );
}

export default GetFreeGifts;
