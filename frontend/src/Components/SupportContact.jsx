import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import Topbar from './Topbar';
import Navbar from './Navbar';
import { useState } from 'react';
import axios from 'axios'

function SupportContact() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [location, setLocation] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId")

        if (!userId) {
            alert("Please login first");
            return;
        }

        try {
            const res = await axios.post(
                "https://purplle-ecommerce-clone-backend.onrender.com/contact",
                {
                    userId,
                    fullName,
                    email,
                    phoneNumber,
                    location,
                    message
                }
            );

            alert('Message Sent Successfully');

            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setLocation("");
            setMessage("");

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
                            <button><FaArrowLeft className="arrow-left" style={{ cursor: 'pointer' }} /></button>
                            Support - Contact Form
                        </h2>

                        <div className="line"><hr /></div>

                        <p className="deliver-to">Get any help, regarding any doubts</p>
                        <p className="address-info">Contact Form</p>

                        <form onSubmit={handleSubmit}>
                            <div className="edit-user-form">
                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Full Name *</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="myaddress-city-state">
                                    <div className="edit-form-details">
                                        <label htmlFor="" className="form-items">Email *</label>
                                        <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    </div>

                                    <div className="edit-form-details">
                                        <label htmlFor="" className="form-items">Phone Number *</label>
                                        <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                    </div>
                                </div>

                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Location *</label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Message *</label>
                                    <textarea name="" id="" cols={30} rows={5} style={{paddingLeft:'7px', paddingTop:'5px'}} value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                                </div>

                                <button type='submit' className="update-btn">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupportContact