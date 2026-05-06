import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

function ProductAds4() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("https://purplle-ecommerce-clone-backend.onrender.com/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <section className="productadsFirst">
                {products && products.filter((product) => product.category === 'Product Ads2').map((product) => (
                    <Link key={product._id} to={`/singleProductPage/${product._id}`} onClick={() => window.scrollTo(0, 0)}>
                        <img src={product.productImage} alt={product.productName} />
                    </Link>

                ))}
            </section>
        </>
    );
}

export default ProductAds4;
