import React from "react";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import PurplleNotices from "./PurplleNotices";
import Footer from "./Footer";
import ProductAds3 from "./ProductAds3";
import { Link } from "react-router-dom";

function Splurge() {
    return(
        <>
            <Topbar />
            <Navbar />
            <main className="herosection">
                <section className="home">
                    <img src="images/splurgehero1.webp" alt="Home1" className="splurgeImage" />
                </section>
            </main>

            <div className="splurge-category">
                <img src="/images/splurgecategory.webp" alt="" />

                <div className="splurge-category-data">
                    <Link to="/shopCategories/skincare" className="splurge1">
                        <img src="/images/splurgeskincare.webp" alt="" />
                    </Link>
                    <Link to="/shopCategories/haircare" className="splurge1">
                        <img src="/images/splurgehaircare.webp" alt="" />
                    </Link>
                    <Link to="/shopCategories/makeup" className="splurge1">
                        <img src="/images/splurgemakeup.webp" alt="" />
                    </Link>
                    <Link to="/shopCategories/fragrance" className="splurge1">
                        <img src="/images/splurgefragrance.webp" alt="" />
                    </Link>
                    
                </div>
            </div>
            <PurplleNotices />
            <Footer />
        </>
    );
}

export default Splurge;
