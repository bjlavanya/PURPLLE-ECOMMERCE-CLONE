import React from "react";

function PurplleNotices() {
    return(
        <>
            <br />
            <hr></hr>
            <section className="notices">
                <div>
                    <img src="/images/iconslock.webp" alt="" />
                    <a href="#" className="notices-links">100% Secure Payments</a>
                    <a href="#" className="notices-info">All major credit & debit cards accepted</a>
                </div>
                <div>
                    <img src="/images/iconbeauty.webp" alt="" />
                    <a href="#" className="notices-links">Beauty Assistant</a>
                    <a href="#" className="notices-info">Tell me what you are looking for and i will work my magic to help you find your perfect match.</a>
                </div>
                <div>
                    <img src="/images/iconhelp.webp" alt="" />
                    <a href="#" className="notices-links">Help Center</a>
                    <a href="#" className="notices-info">Got a question? Look no further. Browse FAQs or submit your query.</a>
                </div>
            </section>
        </>
    );
}

export default PurplleNotices;
