import React from "react";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import PurplleNotices from "./PurplleNotices";
import Footer from "./Footer";

function NewFeatured() {
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
                <h4>Good Vibes</h4>

                <div className="goodvibesImages">
                    <div className="sponsored">
                        <a href="#"><img src="images/goodvibes1.avif" alt="Image" id="img1" /></a>
                        
                        <div className="productInfo1" style={{ marginLeft: 'auto' }}>
                            <h5>Dove Daily Shine BIO PRO <br /> Shampoo 340 ml</h5>
                            <h4>&nbsp;₹290 <strike>₹435</strike> <span>33% off</span> </h4>
                            <div className="rating-info">
                                <div className="ratings">
                                    <h6>4.4 <i className="fa-solid fa-star"></i> </h6> 
                                </div>
                                <p>(587)</p>
                            </div>
                        </div>
                    </div>
                    <div className="sponsored">
                        <a href="#"><img src="images/goodvibes2.webp" alt="Image" /></a>
                        
                        <div className="productInfos">
                            <h5>Alps Goodness <br /> Fermented Rice Water (100 ml)</h5>
                            <h4>₹194 <strike>₹225</strike> <span>14% off</span> </h4>
                            <div className="rating-info">
                                <div className="ratings">
                                    <h6>4.4 <i className="fa-solid fa-star"></i> </h6> 
                                </div>
                                <p>(587)</p>
                            </div>
                        </div>
                    </div>
                    <div className="sponsored">
                        <a href="#"><img src="images/goodvibes3.avif" alt="Image" /></a>
                        
                        <div className="productInfos">
                            <h5>Good Vibes <br /> CICA Brightening Glow Sunscreen</h5>
                            <h4>₹170 <strike>₹240</strike> <span>27% off</span> </h4>
                            <div className="rating-info">
                                <div className="ratings">
                                    <h6>4.4 <i className="fa-solid fa-star"></i> </h6> 
                                </div>
                                <p>(587)</p>
                            </div>
                        </div>
                    </div>
                    <div className="sponsored">
                        <a href="#"><img src="images/goodvibes4.webp" alt="Image" /></a>
                        
                        <div className="productInfos">
                            <h5>DERMDOC <br /> 5% Glycolic Acid Under Arm Spray</h5>
                            <h4>₹294 <strike>₹350</strike> <span>16% off</span> </h4>
                            <div className="rating-info">
                                <div className="ratings">
                                    <h6>4.4 <i className="fa-solid fa-star"></i> </h6> 
                                </div>
                                <p>(587)</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
            <PurplleNotices />
            <Footer />
        </>
    );
}

export default NewFeatured;
