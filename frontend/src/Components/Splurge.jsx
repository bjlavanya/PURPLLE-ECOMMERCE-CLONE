import React from "react";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import PurplleNotices from "./PruplleNotices";
import Footer from "./Footer";

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
            <PurplleNotices />
            <Footer />
        </>
    );
}

export default Splurge;
