import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import PurplleNotices from "./PurplleNotices";
import Footer from "./Footer";

function SearchPage() {
    const [products, setProducts] = useState([])
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get("q");

    useEffect(() => {
        if (searchQuery) {
            axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/search?q=${searchQuery}`)
                .then((res) => setProducts(res.data.products))
                .catch(err => console.log(err));
        }

    }, [urlParams]);
    return (
        <>
            <Topbar />
            <Navbar />

            <div className="search-page">
                <div className="search-heading">
                    <h2 className="main-heading">{searchQuery}</h2>
                    <h6 className="sub-heading">Showing <b>{products.length}</b> Products</h6>
                </div>

                <div className="search-product-list">
                    {products && products.map((product) => (
                        <Link to={`/singleProductPage/${product._id}`} className="product-list" key={product._id}>
                            <div className="product-image">
                                <img src={product.productImage} alt={product.title} />
                            </div>

                            <div className="product-details">
                                <p className="product-name">{product.productName} </p>

                                <p className="product-descriptiom">{product.productDescription.substr(0, 40) + "...."}</p>

                                <div className="price-section">
                                    <span className="price">₹{product.newPrice} </span>
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

export default SearchPage