import React from "react";
import { useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

function Footer() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [location, setLocation] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId")

        try {
            if (!userId) {
                alert("Please login first");
                return;
            }
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

            toast-success('Message Sent Successfully');

            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setLocation("");
            setMessage("");

        }

        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <section className="imp-links">

                <p className="contact-heading">
                    Contact Form
                </p>

                <p className="subtitle">
                    For any help, send the message through contact form
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="contact-form">
                        <div className="contact-data">
                            <div className="contact-details">
                                <label htmlFor="">Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="contact-details">
                                <label htmlFor="">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="contact-data">
                            <div className="contact-details">
                                <label htmlFor="">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    pattern='[0-9]{10}' maxLength={10}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="contact-details">
                                <label htmlFor="">Location</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="message-details">
                            <label htmlFor="">Message</label>
                            <textarea name="" id="" cols={30} rows={5} style={{ paddingLeft: '7px', paddingTop: '5px' }} value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                        </div>

                        <div className="send-message">
                            <button type='submit'>Send Message</button>
                        </div>
                    </div>
                </form>

                
            </section>
            <br /><br /><br />

            <footer>
                <div className="footer-details">
                    <div className="footer-heading">
                        <h3>Purplle</h3>
                    </div>
                    <div className="footer-details footer-links">
                        <Link to='/aboutUs' onClick={() => window.scrollTo(0, 0)}>About Us</Link><a href="https://purplle.turbohire.co/careerpage/3ed17e54-f66f-4ade-90b9-ef064dc6fbd6">Careers</a>
                    </div>
                </div>
                <div className="footer-details">
                    <div className="footer-heading">
                        <h3>Quick Links</h3>
                    </div>
                    <div className="footer-details footer-links">
                        <Link to='/offer' onClick={() => window.scrollTo(0, 0)}>Offers</Link>
                        <Link to='/new' onClick={() => window.scrollTo(0, 0)}>New Featured Products</Link>
                        <Link to='/eliteoffers' onClick={() => window.scrollTo(0, 0)}>Elite Offers</Link>
                    </div>
                </div>
                <div className="footer-details">
                    <div className="footer-heading">
                        <h3>Need Help ?</h3>
                    </div>
                    <div className="footer-details footer-links">
                        <Link to='/supportContactForm' onClick={() => window.scrollTo(0, 0)}>Contact Us</Link>
                    </div>
                </div>
            </footer>

            <div className="footer-line"></div>

            <div className="footer-bottom">
                <div className="footer-bottom-details">
                    <div className="footer-bottom-heading">
                        <h3>Payment</h3>
                    </div>
                    <div className="footer-bottom-pay-connect">
                        <img src="/images/payment1.webp" alt="" />
                    </div>
                </div>
                <div className="footer-bottom-details">
                    <div className="footer-bottom-heading">
                        <h3>Connect</h3>
                    </div>
                    <div className="footer-bottom-pay-connect">
                        <a href="https://www.facebook.com/letspurplle" className="facebook"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="https://x.com/letspurplle" className="twitter"><i className="fa-brands fa-twitter"></i></a>
                        <a href="https://in.pinterest.com/letspurplle/" className="pinterest"><i className="fa-brands fa-pinterest"></i></a>
                        <a href="https://www.youtube.com/channel/UCI_6AcJI1sKexCLb2NAYTOQ" className="youtube"><i className="fa-brands fa-youtube"></i></a>
                        <a href="https://www.linkedin.com/company/purplle-com" className="linkedin"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <p>Copyright &copy; 2020 Purplle. All Rights Reserved.</p>
            </div>
        </>
    );
}

export default Footer;
