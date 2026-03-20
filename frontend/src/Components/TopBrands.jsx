import React from "react";
import { topBrands } from "./AllProducts";

function TopBrands() {
    return(
        <>
            <main className="handpicked">
                <section className="headings">
                    <h4 style={{ paddingTop: '60px'}} className="topbrands-heading">AMAZING DEALS ON BEST BRANDS</h4>
                </section>

                <section className="productadsFirst" style={{ padding: '0px 110px 0 110px' }} >
                    {topBrands.map((product) => (
                    <img src={product.image} alt="" key={product.id}/>
                    
                    ))}
                </section>
            </main>

        </>
    );
}

export default TopBrands;
