import React from "react";
import Topbar from "./Topbar";
import PurplleNotices from "./PurplleNotices";
import Footer from "./Footer";
import Navbar from "./Navbar";

function EliteOffers() {
    return(
        <>
            <Topbar />
            <Navbar />
            <main className="herosection">
                <section className="home">
                    <img src="images/eliteoffersimg.webp" alt="Home1" className="eliteofferimage" />
                </section>
            </main>

            <main className="handpicked">
                <section className="headings" style={{marginBottom:'-50px'}}>
                    <h4 className="handpickedHeading">TOP DEALS</h4>
                </section>
            </main>
            <section className="elitetopdeals">
                <img src="images/elitedeals1.webp" alt="" className="elitedeals" />
                <img src="images/elitedeals2.webp" alt="" className="elitedeals" />
        
                <img src="images/elitedeals3.webp" alt="" className="elitedeals" />
                <img src="images/elitedeals4.webp" alt="" className="elitedeals" />
            
            </section>

            <PurplleNotices />
            <Footer />
        </>
    );
}

export default EliteOffers;
