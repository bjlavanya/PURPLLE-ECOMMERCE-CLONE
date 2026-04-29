import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import Login from './Login'
import SearchModal from "./SearchModal";
import { CiFaceSmile } from "react-icons/ci";
import { PiPackageLight } from "react-icons/pi";
import { IoIosLogIn } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

function MyAddressForm() {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId");

    const [pincode, setPincode] = useState("")
    const [location, setLocation] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const [user, setUser] = useState({
        username: "",
        phonenumber: ""
    })

    const [showModal, setShowModal] = useState(false);
    const [searchModal, setSearchModal] = useState(false)

    //submenu
    const [open, setOpen] = useState(false);
    const subMenuRef = useRef()
    const menuRef = useRef()

    useEffect(() => {
        let handler = (e) => {
            if (menuRef.current && subMenuRef.current && !menuRef.current.contains(e.target) && !subMenuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    })

    useEffect(() => {
        if (userId) {
            axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/userData/${userId}`)
                .then(res => setUser({
                    username: res.data.username || "",
                    phonenumber: res.data.phonenumber || ""
                }))
                .catch(err => console.log(err))
        }
    }, [userId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await axios.put(
                `https://purplle-ecommerce-clone-backend.onrender.com/profile/myaddress/${userId}`,
                {
                    pincode,
                    location,
                    city,
                    state,
                    username: user.username,
                    phonenumber: user.phonenumber
                }
            )

            console.log(response.data)
            alert("Address added successfully")
            navigate('/addToCart', { state: { openPayment: true } })

            setPincode("")
            setLocation("")
            setCity("")
            setState("")

        } catch (error) {
            console.log(error)
        }
    }

    const closeModal = () => {
        return setShowModal(false);
    }

    const closeSearchModal = () => {
        return setSearchModal(false);
    }

    const handleLogout = () => {
        localStorage.removeItem("userId")
        localStorage.removeItem('cart')
        window.location.reload()
    }

    const back = () => {
        navigate(-1)
    }
    return (
        <>

            <nav>
                <div className="navbar">
                    <div className="logos">
                        <Link to="/"><img src="/images/purpllelogo.svg" alt="Puplle Logo" id="purplle" /></Link>
                        <img src="/images/elitelogo.gif" alt="Elite Logo" id="elite" style={{ marginLeft: "3px", width: 50 }} />
                    </div>

                    <div className="nav-icons">
                        <Link href="" id="search" onClick={() => setSearchModal(true)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Link>
                        {searchModal && <SearchModal closeSearchModal={closeSearchModal} />}


                        <Link ref={menuRef} id="smile" onClick={() => setOpen(!open)}>
                            <i className="fa-regular fa-face-smile"></i>
                        </Link>

                        {
                            open &&
                            <div ref={subMenuRef} className="sub-menu-wrap" id="submenu">
                                <div className="sub-menu">
                                    <Link to='/userProfile' className="sub-menu-link" style={{ paddingTop: '8px' }} >
                                        <i><CiFaceSmile /></i>
                                        <p>My Account</p>
                                    </Link>

                                    <Link to='/userProfile' className="sub-menu-link" style={{ paddingTop: '8px' }} >
                                        <i><CiLocationOn /></i>
                                        <p>My Address</p>
                                    </Link>

                                    {
                                        userId ? (
                                            <Link to='/myOrders' href="#" className="sub-menu-link">
                                                <i><PiPackageLight /></i>
                                                <p>My Orders</p>
                                            </Link>

                                        ) : (
                                            <Link href="#" className="sub-menu-link" onClick={() => setShowModal(true)}>
                                                <i><PiPackageLight /></i>
                                                <p>My Orders</p>
                                            </Link>
                                        )
                                    }


                                    {userId ? (
                                        <Link href="#" className="sub-menu-link" onClick={handleLogout}>
                                            <i><IoIosLogIn /></i>
                                            <p>Logout</p>
                                        </Link>
                                    ) : (
                                        <Link href="#" className="sub-menu-link" onClick={() => setShowModal(true)}>
                                            <i><IoIosLogIn /></i>
                                            <p>Login or Register</p>
                                        </Link>
                                    )}
                                    {showModal && <Login closeModal={closeModal} />}
                                </div>
                            </div>

                        }
                    </div>

                </div>
            </nav>

            <div className="user-my-address">
                <div className="user-myaddress-details">
                    <div className="my-orders edit-user">
                        <h2 className="my-orders-heading">
                            <button onClick={back}><FaArrowLeft className="arrow-left" style={{ cursor: 'pointer' }} /></button>
                            Add Address
                        </h2>

                        <div className="line"><hr /></div>

                        <p className="deliver-to">Deliver To</p>
                        <p className="address-info">Address Info</p>

                        <form onSubmit={handleSubmit}>
                            <div className="edit-user-form">
                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Pincode *</label>
                                    <input type="text" name="pincode" id="pincode" value={pincode}
                                        onChange={(e) => setPincode(e.target.value)} required />
                                </div>

                                <div className="myaddress-city-state">
                                    <div className="edit-form-details">
                                        <label htmlFor="" className="form-items">City *</label>
                                        <input type="text" name="city" id="city" value={city}
                                            onChange={(e) => setCity(e.target.value)} required />
                                    </div>

                                    <div className="edit-form-details">
                                        <label htmlFor="" className="form-items">State *</label>
                                        <input type="text" name="state" id="state" value={state}
                                            onChange={(e) => setState(e.target.value)} required />
                                    </div>
                                </div>

                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Address *</label>
                                    <input type="text" name="address" id="address" value={location}
                                        onChange={(e) => setLocation(e.target.value)} required />
                                </div>

                                <p className="contact-info">Contact Info</p>

                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Name *</label>
                                    <input type="text" name="name" id="name" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required />
                                </div>

                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Phone Number *</label>
                                    <input type="tel" pattern='[0-9]{10}' maxLength={10} name="phoneNumber" id="phoneNumber" value={user.phonenumber} onChange={(e) => setUser({ ...user, phonenumber: e.target.value })} required />
                                </div>

                                <button className="update-btn">
                                    Save Address
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyAddressForm