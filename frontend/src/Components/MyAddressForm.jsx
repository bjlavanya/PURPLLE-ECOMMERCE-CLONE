import Topbar from './Topbar'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import axios from 'axios'

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

            const response = await axios.post(
                `https://purplle-ecommerce-clone-backend.onrender.com/profile/myaddress/${userId}`,
                {
                    pincode,
                    location,
                    city,
                    state
                }
            )

            console.log(response.data)
            alert("Address added successfully")

            setPincode("")
            setLocation("")
            setCity("")
            setState("")

        } catch (error) {
            console.log(error)
        }
    }

    const back = () => {
        navigate(-1)
    }
    return (
        <>
            <Navbar />

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
                                    <input type="text" name="name" id="name" value={user?.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required />
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