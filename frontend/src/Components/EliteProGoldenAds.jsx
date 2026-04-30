import React from "react";
import { Link } from "react-router-dom";

function EliteProGoldenAds() {
    return(
        <>
            <main className="elitepro">
                <section className="home">
                    <img src="images/elitegolden.webp" alt="Home1" />
                </section>
            </main>

            <main className="elitepro">
                <Link to='/eliteoffers' className="home">
                    <img src="images/elitegoldenpro.webp" alt="Home1" />
                </Link>
            </main>
        </>
    );
}

export default EliteProGoldenAds;
