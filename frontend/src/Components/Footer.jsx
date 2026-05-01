import React from "react";
import { useState } from 'react';
import axios from 'axios'

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

            alert('Message Sent Successfully');

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

                {/* <div className="link-infos" style={{ paddingTop: '50px' }}>
                    <div className="link-heading"><a href="#" >Discover:</a></div>
                    <div className="link-details">
                        <a href="" className="product-links">Nail Art /</a>  <a href="" className="product-links">Eye Makeup /</a>  <a href="" className="product-links">Bridal Makeup /</a>  <a href="" className="product-links">How To Do makeup /</a>  <a href="" className="product-links">pimples /</a>  <a href="" className="product-links">Stretchmark removal /</a>  <a href="" className="product-links">best eye creams /</a>  <a href="" className="product-links">hairstyles /</a> <a href="" className="product-links"> bets facewashes for men /</a>  <a href="" className="product-links">burgundy hair colors</a> <a href="" className="product-links">Best perfumes for men /</a> <a href="" className="product-links">Skincare tips</a>
                    </div>
                </div>
                <div className="link-infos" style={{ paddingTop: '20px' }}>
                    <div className="link-heading"><a href="#" >SHOP MAKEUP:</a></div>
                    <div className="link-details">
                        <a href="" className="product-links">Lakme /</a>  <a href="" className="product-links">Maybelline /</a>  <a href="" className="product-links">colorbar /</a>  <a href="" className="product-links">L'oreal /</a>  <a href="" className="product-links">revlon /</a>  <a href="" className="product-links">avon /</a>  <a href="" className="product-links">elle18 </a>  
                    </div>
                </div>
                <div className="link-infos" style={{ paddingTop: '20px' }}>
                    <div className="link-heading"><a href="#" >SKIN CARE:</a></div>
                    <div className="link-details">
                        <a href="" className="product-links">Bio Oil /</a>  <a href="" className="product-links">Olay /</a>  <a href="" className="product-links">Neutrogena /</a>  <a href="" className="product-links">Lotus Herbals /</a>  <a href="" className="product-links">VLCC /</a>  <a href="" className="product-links">Kaya /</a>  <a href="" className="product-links">Vichy /</a>  <a href="" className="product-links">Nivea /</a> <a href="" className="product-links"> Gillette /</a>  <a href="" className="product-links">Park Avenue</a>
                    </div>
                </div>
                <div className="link-infos" style={{ paddingTop: '20px' }}>
                    <div className="link-heading"><a href="#" >HAIR PRODUCTS:</a></div>
                    <div className="link-details">
                        <a href="" className="product-links">L'oreal professional /</a>  <a href="" className="product-links">schwarzkopf /</a>  <a href="" className="product-links">matrix biolage /</a>  <a href="" className="product-links">livon hair gain /</a>  <a href="" className="product-links">biotique /</a>  <a href="" className="product-links">roots </a>  
                    </div>
                </div>
                <div className="link-infos" style={{ paddingTop: '20px' }}>
                    <div className="link-heading">
                        <a href="#" >FRAGRANCE:</a>
                    </div>
                    <div className="link-details">
                        <a href="" className="product-links">davidoff /</a>  <a href="" className="product-links">hugo boss /</a>  <a href="" className="product-links">calvin klein /</a>  <a href="" className="product-links">elizabeth arden /</a>  <a href="" className="product-links">jaguar /</a>  <a href="" className="product-links">victoria's secret </a>  
                    </div>
                </div>
                <div className="link-infos" style={{ paddingTop: '20px' }}>
                    <div className="link-heading"><a href="#" >ELECTRONICS:</a></div>
                    <div className="link-details">
                        <a href="" className="product-links">Philips /</a>  <a href="" className="product-links">wahl /</a>  <a href="" className="product-links">braun /</a>  <a href="" className="product-links">remington </a>  
                    </div>
                </div> */}
            </section>
            <br /><br /><br />

            <footer>
                <div className="footer-details">
                    <div className="footer-heading">
                        <h3>Purplle</h3>
                    </div>
                    <div className="footer-details footer-links">
                        <a href="#">About Us</a><a href="">Our Team</a><a href="https://purplle.turbohire.co/careerpage/3ed17e54-f66f-4ade-90b9-ef064dc6fbd6">Careers</a><a href="">Press</a><a href="">Sitemap</a><a href="">Investor Realtion</a>
                    </div>
                </div>
                <div className="footer-details">
                    <div className="footer-heading">
                        <h3>Privacy Info</h3>
                    </div>
                    <div className="footer-details footer-links">
                        <a href="#">Privacy Policy</a><a href="">Term of Use</a><a href="">Return & Cancellation Policy</a>
                    </div>
                </div>
                <div className="footer-details">
                    <div className="footer-heading">
                        <h3>Need Help ?</h3>
                    </div>
                    <div className="footer-details footer-links">
                        <a href="#">FAQs</a><a href="">Contact Us</a>
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
