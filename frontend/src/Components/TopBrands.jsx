import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

function TopBrands() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("https://purplle-ecommerce-clone-backend.onrender.com/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <main className="handpicked">
                <section className="headings">
                    <h4 style={{ paddingTop: '60px' }} className="topbrands-heading">AMAZING DEALS ON BEST BRANDS</h4>
                </section>

                <section className="productadsFirst" style={{ padding: '0px 110px 0 110px' }} >
                    {products && products.filter((product) => product.category === 'topbrands').map((product) => (
                        <Link to={`/singleProductPage/${product._id}`} onClick={() => window.scrollTo(0, 0)}>
                            <img src={product.productImage} alt={product.productName} key={product._id}/>
                        </Link>
                    ))}
                </section>
            </main>

        </>
    );
}

export default TopBrands;
