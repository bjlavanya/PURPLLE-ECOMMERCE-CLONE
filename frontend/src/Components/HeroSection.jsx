import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { heroSectionSlider } from "./AllProducts";

function HeroSection() {
    const settings = {
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
    }
    return(
    <>
        <main className="herosection" style={{paddingRight:'20px', marginLeft:'-10px'}}>
            <Slider {...settings} style={{width:'100%', height:'450px',}}>
                {heroSectionSlider.map((product) => (
                    <section className="home" key={product.id}>
                        <img src={product.image} alt="Herosection" style={{width:'1280px', height:'430px',}}/>
                    </section>
                ))}
            </Slider>
        </main>
    </>
    );
}

export default HeroSection;
