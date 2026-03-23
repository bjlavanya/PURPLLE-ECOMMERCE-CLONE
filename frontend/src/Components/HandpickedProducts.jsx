import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

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

function HandpickedProducts() {

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
    <main className="handpicked">
      <section className="headings">
        <h4 className="handpickedHeading">HANDPICKED FOR YOU</h4>
        <h5 className="view-all">View ALL <i className="fa-solid fa-arrow-right"></i></h5>
        <p className="sponsored">Sponsored</p>
      </section>

      <section className="handpickedImage">
        <Slider {...settings}>
            { products && products.filter((product) => product.category === 'Handpicked Products').map((product) => (
                <div  className="sponsored" key={product.id}>
                    <Link to={`/singleProductPage/${product._id}`}>
                        <img src={`https://purplle-ecommerce-clone-backend.onrender.com/${product.productImage}`} alt={product.productName} />
                    </Link>

                    {/* <div className="offers">
                        <h3>3 offers</h3>
                    </div> */}
                    
                    <div className="productInfos" style={{marginTop:'-40px'}}>
                    <h5 style={{marginTop:'-10px'}}>{product.productName} </h5>
                    <h5 style={{marginTop:'-22px', width:'225px'}}>{product.productDescription.substr(0,50)+"...."}</h5>
                    <h4 style={{marginLeft:'-70px'}}>₹{product.newPrice} <strike>₹{product.oldPrice}</strike> <span>{product.discount}% off</span></h4>
                    </div>
                </div>
            ))}

        </Slider>
      </section>
    </main>
  );
}

export default HandpickedProducts;
