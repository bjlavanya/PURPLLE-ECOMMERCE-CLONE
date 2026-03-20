import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

function BestSellerProducts() {

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
        image: "/images/bestsellers1.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 2,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/bestsellers2.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 3,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/bestsellers3.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 4,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/bestsellers4.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 5,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/bestsellers5.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 0,
    },
    {
        id: 6,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/bestsellers6.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 7,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/bestsellers7.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 8,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/bestsellers8.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 9,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/bestsellers9.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
    {
        id: 10,
        title: "Dove Daily Shine",
        subtitle: "Bio PRO Shampoo 340ml",
        image: "/images/bestsellers10.webp",
        price: 290,
        oldPrice: 435,
        discount: 33,
        offers: 3,
    },
  ];

  return (
    <main className="handpicked">
      <section className="headings">
        <h4 className="handpickedHeading" style={{paddingBottom:'40px'}}>THE BEST SELLERS</h4>
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

export default BestSellerProducts;
