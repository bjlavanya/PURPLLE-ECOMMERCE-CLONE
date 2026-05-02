import React from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import PurplleNotices from './PurplleNotices'
import Footer from './Footer'

function AboutUs() {
  return (
    <>
        <Topbar />
        <Navbar />

        <div className="aboutus-section">
            <div className="aboutus-details">
                <img src="/images/aboutusimg1.webp" className='img1' alt="" />

                <img src="/images/aboutusimg2.webp" className='img2' alt="" />

                <img src="/images/aboutusimg3.webp" className='img3' alt="" />

                <div className="images">
                    <img src="/images/aboutusimg4.webp" className='img4' alt="" />
                    <img src="/images/aboutusimg5.webp" className='img5' alt="" />
                </div>
            </div>
        </div>

        <PurplleNotices />
        <Footer />
    </>
  )
}

export default AboutUs