import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import axios from 'axios'
import Topbar from './Topbar';
import Navbar from './Navbar';

function EditMyAddress() {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId");

    const [user, setUser] = useState({
        username: "",
        phonenumber: "",
        address: {
            pincode: "",
            location: "",
            city: "",
            state: ""
        }
    })

    const back = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (userId) {
            axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/userData/${userId}`)
                .then(res => setUser({
                    username: res.data.username || "",
                    phonenumber: res.data.phonenumber || "",
                    address: {
                        pincode: res.data.address?.[0]?.pincode || "",
                        location: res.data.address?.[0]?.location || "",
                        city: res.data.address?.[0]?.city || "",
                        state: res.data.address?.[0]?.state || ""
                    }
                }))
                .catch(err => console.log(err))
        }

    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://purplle-ecommerce-clone-backend.onrender.com/profile/myaddress/${userId}`, {
                username: user.username,
                phonenumber: user.phonenumber,
                pincode: user.address.pincode,
                city: user.address.city,
                state: user.address.state,
                location: user.address.location
            });

            alert("Address Updated Successfully");

            //navigate('/addTocart', {state: {openPayment : true}})
            navigate(-1);

        } catch (err) {
            console.log(err);
        }

    };
    return (
        <>
            <Topbar />
            <Navbar />
            <div className="user-my-address">
                <div className="user-myaddress-details">
                    <div className="my-orders edit-user">
                        <h2 className="my-orders-heading">
                            <button onClick={back}><FaArrowLeft className="arrow-left" style={{ cursor: 'pointer' }} /></button>
                            Edit Address
                        </h2>

                        <div className="line"><hr /></div>

                        <p className="deliver-to">Deliver To</p>
                        <p className="address-info">Address Info</p>

                        <form onSubmit={handleSubmit}>
                            <div className="edit-user-form">
                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Pincode *</label>
                                    <input type="text" name="pincode" id="pincode" value={user.address.pincode}
                                        onChange={(e) => setUser({ ...user, address: { ...user.address, pincode: e.target.value } })} required />
                                </div>

                                <div className="myaddress-city-state">
                                    <div className="edit-form-details">
                                        <label htmlFor="" className="form-items">City *</label>
                                        <input type="text" name="city" id="city" value={user.address.city}
                                            onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })} required />
                                    </div>

                                    <div className="edit-form-details">
                                        <label htmlFor="" className="form-items">State *</label>
                                        <input type="text" name="state" id="state" value={user.address.state}
                                            onChange={(e) => setUser({ ...user, address: { ...user.address, state: e.target.value } })} required />
                                    </div>
                                </div>

                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Address *</label>
                                    <input type="text" name="address" id="address" value={user.address.location}
                                        onChange={(e) => setUser({ ...user, address: { ...user.address, location: e.target.value } })} required />
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
                                    Update Address
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditMyAddress