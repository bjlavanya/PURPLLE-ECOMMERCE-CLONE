import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import Topbar from './Topbar';
import Navbar from './Navbar';

function SupportContact() {
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

                        <form>
                            <div className="edit-user-form">
                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Full Name *</label>
                                    <input type="text" name="fullname" id="fullname" required />
                                </div>

                                <div className="myaddress-city-state">
                                    <div className="edit-form-details">
                                        <label htmlFor="" className="form-items">Email *</label>
                                        <input type="text" name="email" id="email" required />
                                    </div>

                                    <div className="edit-form-details">
                                        <label htmlFor="" className="form-items">Phone Number *</label>
                                        <input type="text" name="phonenumber" id="phonenumber" required />
                                    </div>
                                </div>

                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Location *</label>
                                    <input type="text" name="location" id="location" required />
                                </div>

                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">Message *</label>
                                    <textarea name="" id="" cols={30} rows={5}></textarea>
                                </div>

                                <button className="update-btn">
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