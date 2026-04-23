import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { budgetBeautyProducts, } from "./AllProducts";
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

function BudgetBeautyProducts() {

  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("https://purplle-ecommerce-clone-backend.onrender.com/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, [])

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let userId = localStorage.getItem("userId")
    const existing = cart.find(
      item => item.productId === product._id && item.userId === userId
    );
    if (existing) {
      navigate("/addToCart");
    }
    else {
      cart.push({ userId: userId, productId: product._id, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/addToCart");
  }

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
        <h4 className="handpickedHeading" style={{ paddingBottom: '40px' }}>BUDGET BEAUTY BUNDLES</h4>
      </section>

      <section className="handpickedImage">
        <Slider {...settings}>
          {products && products.filter((product) => product.category === 'Budget Beauty').map((product) => (
            <div className="sponsored" key={product._id}>
              <Link to={`/singleProductPage/${product._id}`}>
                <img src={product.productImage} alt={product.productName} />
              </Link>

              <div className="productInfos" style={{ marginTop: '-30px' }}>
                <h5 style={{ marginTop: '-10px' }}>{product.productName} </h5>
                <h5 style={{ marginTop: '-22px', width: '225px' }}>{product.productDescription.substr(0, 50) + "...."}</h5>
                <h4>₹{product.newPrice} <strike>₹{product.oldPrice}</strike> <span>{product.discount}% off</span></h4>
              </div>

              <Link className="cart-btn" onClick={() => addToCart(product)} to="/addToCart" >
                <h3>Add to Cart</h3>
              </Link>
            </div>
          ))}

        </Slider>
      </section>
    </main>
  );
}

export default BudgetBeautyProducts;
