import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {editorPickProducts, } from "./AllProducts";

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

function EditorPickProducts() {

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
        <h4 className="handpickedHeading" style={{paddingBottom:'40px'}}>EDITOR'S PICK</h4>
      </section>

      <section className="handpickedImage">
        <Slider {...settings}>
            {editorPickProducts.map((product) => (
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

export default EditorPickProducts;
