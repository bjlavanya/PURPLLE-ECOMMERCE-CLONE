import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

function ProductAds3() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("https://purplle-ecommerce-clone-backend.onrender.com/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <section class="productadsFirst">
                {products && products.filter((product) => product.category === 'Product Ads3').map((product) => (
                    <Link to={`/singleProductPage/${product._id}`}>
                        <img src={product.productImage} alt={product.productName} />
                    </Link>

                ))}
            </section>
        </>
    );
}

export default ProductAds3;
