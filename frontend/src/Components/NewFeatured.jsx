import React, {useState} from "react";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import PurplleNotices from "./PurplleNotices";
import Footer from "./Footer";

function NewFeatured() {
    const products = [
        {
            id: 1,
            category: "Haircare",
            image: "images/goodvibes1.avif",
            name: "Dove Daily Shine BIO PRO Shampoo 340 ml",
            price: 290,
            oldPrice: 435,
            discount: "33%",
            rating: 4.4,
            reviews: 587
        },
        {
            id: 2,
            category: "Haircare",
            image: "images/goodvibes2.webp",
            name: "Alps Goodness Fermented Rice Water (100 ml)",
            price: 194,
            oldPrice: 225,
            discount: "14%",
            rating: 4.4,
            reviews: 587
        },
        {
            id: 3,
            category: "Skincare",
            image: "images/goodvibes3.avif",
            name: "Good Vibes CICA Brightening Glow Sunscreen",
            price: 170,
            oldPrice: 240,
            discount: "27%",
            rating: 4.4,
            reviews: 587
        },
        {
            id: 4,
            category: "Bodycare",
            image: "images/goodvibes4.webp",
            name: "DERMDOC 5% Glycolic Acid Under Arm Spray",
            price: 294,
            oldPrice: 350,
            discount: "16%",
            rating: 4.4,
            reviews: 587
        },
        {
            id: 5,
            category: "Bodycare",
            image: "images/goodvibes4.webp",
            name: "DERMDOC 5% Glycolic Acid Under Arm Spray",
            price: 294,
            oldPrice: 350,
            discount: "16%",
            rating: 4.4,
            reviews: 587
        },
        {
            id: 6,
            category: "Bodycare",
            image: "images/goodvibes4.webp",
            name: "DERMDOC 5% Glycolic Acid Under Arm Spray",
            price: 294,
            oldPrice: 350,
            discount: "16%",
            rating: 4.4,
            reviews: 587
        }
        ,{
            id: 7,
            category: "Bodycare",
            image: "images/goodvibes4.webp",
            name: "DERMDOC 5% Glycolic Acid Under Arm Spray",
            price: 294,
            oldPrice: 350,
            discount: "16%",
            rating: 4.4,
            reviews: 587
        }
        ,{
            id: 8,
            category: "Bodycare",
            image: "images/goodvibes4.webp",
            name: "DERMDOC 5% Glycolic Acid Under Arm Spray",
            price: 294,
            oldPrice: 350,
            discount: "16%",
            rating: 4.4,
            reviews: 587
        }
    ];

    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                  (product) => product.category === selectedCategory
              );

    return(
        <>
            <Topbar />
            <Navbar />
            <section className="breadcrumbs">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/offer">Offers</Link></li>
                    <li>New Launches at Purplle</li>
                </ul>
            </section>

            <section className="new-featured">
                <h1>New Launches At Purplle 1</h1>

                <div className="filter-buttons">
                    <button onClick={() => setSelectedCategory("All")}>All</button>
                    <button onClick={() => setSelectedCategory("Haircare")}>Haircare</button>
                    <button onClick={() => setSelectedCategory("Skincare")}>Skincare</button>
                    <button onClick={() => setSelectedCategory("Bodycare")}>Bodycare</button>
                </div>

                <h4>{selectedCategory}</h4>

                <div className="goodvibesImages">
                    <div className="featured-grid-container"> 
                    {filteredProducts.map((product) => (
                        <div className="sponsored" key={product.id}>
                            <a href="#">
                                <img src={product.image} alt={product.name} />
                            </a>

                            <div className="productInfos">
                                <h5>{product.name.substr(0,25)+"...."}</h5>

                                <h4>
                                    ₹{product.price}{" "}
                                    <strike>₹{product.oldPrice}</strike>{" "}
                                    <span>{product.discount} off</span>
                                </h4>

                                <div className="rating-info">
                                    <div className="ratings">
                                        <h6>
                                            {product.rating}{" "}
                                            <i className="fa-solid fa-star"></i>
                                        </h6>
                                    </div>
                                    <p>({product.reviews})</p>
                                </div>

                                <small>{product.category}</small>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
            <PurplleNotices />
            <Footer />
        </>
    );
}

export default NewFeatured;
