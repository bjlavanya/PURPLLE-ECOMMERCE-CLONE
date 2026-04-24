import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

function ProductAds1() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("https://purplle-ecommerce-clone-backend.onrender.com/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [])
    
    return (
        < >
            <main className="livepics">
                <section className="home">
                    <img src="images/livepics.webp" alt="LivePic1" />
                    <img src="images/livepics2.webp" alt="LivePic2" />
                    <img src="images/livepics3.webp" alt="LivePic3" />
                </section>
            </main>

            <main className="prodcutslides">
                <section className="home">
                    <img src="images/productslides.webp" alt="Home1" />
                </section>
            </main>

            <section className="productadsFirst">
                {products && products.filter((product) => product.category === 'Product Ads1').map((product) => (
                    <Link to={`/singleProductPage/${product._id}`}>
                        <img src={product.productImage} alt={product.productName} />
                    </Link>

                ))}
            </section>
        </>
    );
}

export default ProductAds1;
