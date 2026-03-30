import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from './Login'
import SearchModal from "./SearchModal";
import axios from "axios";

function Navbar() {
    const [showModal, setShowModal] = useState(false)

    const [searchModal, setSearchModal] = useState(false)

    const userId = localStorage.getItem("userId");

    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const cartItemsCount = cart.length


    // useEffect(() => {
    //     const urlParams = new URLSearchParams(location.search)

    //     const searchQuery = urlParams.get('q')

    //     if(searchQuery) {
    //         const searchQ = urlParams.toString()
    //         axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/search?${searchQ}`)
    //         .then((res) => setProducts(res.data.products)) 
    //     }
    // }, [])

    const closeModal = () => {
        return setShowModal(false);
    }

    const closeSearchModal = () => {
        return setSearchModal(false);
    }

    const handleLogout = () => {
        localStorage.removeItem("userId")
        window.location.reload()
    }

    return (
        <>
            <nav>
                <div className="navbar">
                    <div className="logos">
                        <Link to="/"><img src="/images/purpllelogo.svg" alt="Puplle Logo" id="purplle" /></Link>
                        <img src="/images/elitelogo.gif" alt="Elite Logo" id="elite" style={{ marginLeft: "3px", width: 50 }} />
                    </div>

                    <div className="url">
                        <ul>
                            <li>
                                <a href="">SHOP CATEGORIES</a>
                            </li>
                            <li><a href="#">BRANDS</a></li>
                            <li>
                                <Link to="/offer">OFFERS</Link>
                            </li>
                            <li>
                                <Link to="/new">NEW</Link>
                            </li>
                            <li>
                                <Link to="/splurge">SPLURGE</Link>
                            </li>
                            <li>
                                <Link to="/magazine">MAGAZINE</Link>
                            </li>
                            <li>
                                <Link to="/eliteoffers">ELITE OFFERS</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="nav-icons">
                        <Link href="" id="search" onClick={() => setSearchModal(true)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Link>
                        {searchModal && <SearchModal closeSearchModal={closeSearchModal} />}
                        
                        <a href="" id="heart"><i className="fa-regular fa-heart"></i></a>
                        <Link to='/addToCart' href="" id="bars">
                            <i class="fa-solid fa-cart-arrow-down"></i>
                            {cartItemsCount > 0 &&
                                <span className="cart-item-length">{cartItemsCount}</span>
                            }
                        </Link>

                        {userId ? (
                            <Link id="smile" onClick={handleLogout}>
                                <i className="fa-regular fa-face-smile"></i>
                                <span className="tooltiptext">Logout</span>
                            </Link>
                        ) : (

                            <Link id="smile" onClick={() => setShowModal(true)}>
                                <i className="fa-regular fa-face-smile"></i>
                                <span className="tooltiptext">Login or Register</span>
                            </Link>
                        )}
                        {showModal && <Login closeModal={closeModal} />}
                    </div>

                </div>
                
            </nav>
        </>
    );
}

export default Navbar;