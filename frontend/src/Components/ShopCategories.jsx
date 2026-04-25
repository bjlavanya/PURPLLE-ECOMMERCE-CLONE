import React, { useEffect, useState } from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import { allProducts, categoryImages } from "./AllProducts";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PurplleNotices from './PurplleNotices';
import Footer from './Footer';
import axios from 'axios'


function ShopCategories() {
    const { category } = useParams();
    const heroImage = categoryImages[category];

    const [products, setProducts] = useState([])

    useEffect(() => {
    axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/products/${category}`)
          .then(res => setProducts(res.data))
          .catch(err => console.log(err))
  }, [category])


    return (
        <>
            <Topbar />
            <Navbar />

            <section className="breadcrumbs" style={{ marginTop: '5px' }}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>{category}</li>
                </ul>
            </section>

            <div className="shop-category-skincare search-page">
                <div className="skincare-herosection">
                    <img src={heroImage} alt="" />
                </div>

                <div className="shop-skincare">
                    <p style={{textTransform:'capitalize'}}>{category}</p>
                </div>

                <div className="search-product-list ">
                    {products && products.map((product) => (
                        <Link className="product-list" key={product.id} >
                            <div className="product-image">
                                <img src={product.image} alt={product.title} />
                            </div>

                            <div className="product-details">
                                <p className="product-name">{product.title}  </p>

                                <p className="product-descriptiom">{product.subtitle}</p>

                                <div className="price-section">
                                    <span className="price">₹{product.price} </span>
                                    <span className="old-price">₹{product.oldPrice} </span>
                                    <span className="discount">{product.discount}% off</span>
                                </div>

                                <button className="add-cart">
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>

            <PurplleNotices />
            <Footer />
        </>
    )
}

export default ShopCategories