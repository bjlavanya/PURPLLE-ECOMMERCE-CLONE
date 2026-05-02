import React from "react";
import { Link } from "react-router-dom";

function ElitePro() {
    return (
        <>
            <main className="elitepro">
                <Link to='/eliteoffers'>
                    <section className="home">
                        <img src="/images/elitepro.webp" alt="elitePro" />
                    </section>
                </Link>
            </main>
        </>
    );
}

export default ElitePro;
