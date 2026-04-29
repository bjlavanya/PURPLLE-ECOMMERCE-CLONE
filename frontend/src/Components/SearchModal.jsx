import { RiCloseLargeLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SearchModal({ closeSearchModal }) {
    const inputRef = useRef(null);

    const [query, setQuery] = useState("")
    const [products, setProducts] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleKeyDown = (e) => {

        axios.get("https://purplle-ecommerce-clone-backend.onrender.com/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))

        if (e.key === "Enter") {
            navigate(`/search?q=${query}`);
            closeSearchModal();
        }
    };

    const searchHandleProductName = (productName) => {
        navigate(`/search?q=${productName}`);
        closeSearchModal();
    }

    return (
        <>
            <div className="search-wrapper"></div>

            <div className="search-modal">
                <div className="search-close" onClick={closeSearchModal}>
                    <RiCloseLargeLine />
                </div>

                <div className="searchbar-box">
                    <div className="search-bar">
                        <label htmlFor="">Search for Products and Brands</label>
                        <input type="text" name="search-bar" id="search-bar" ref={inputRef} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>
                    <BsSearch className="search-icon" />
                </div>

                <div className="search-contents">
                    <p className="search-head">Related Products</p>
                    {/* <div className="search-productname">
                        <p className="heading">Related Products</p>
                        {products && products.filter((product) => product.productName.toLowerCase().includes(query.toLowerCase())).splice(0, 5).map((product) => (
                            <p onClick={() => searchHandleProductName(product.productName)} key={product._id}>{product.productName}</p>
                        ))}
                    </div>

                    <div className="line"></div> */}

                    {products && products.filter((product) => product.productName.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map((product) => (
                        <Link to={`/singleProductPage/${product._id}`} onClick={closeSearchModal} className="search-products" key={product._id} >
                            <img src={product.productImage} alt=""  style={{height:'130px'}}/>
                            <div className="product-details">


                                <p className="product-name">{product.productName}</p>

                                <div className="price-section">
                                    <span className="price">₹{product.newPrice} </span>
                                    <span className="old-price">₹{product.oldPrice} </span>
                                    <span className="discount">{product.discount}% off</span>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SearchModal