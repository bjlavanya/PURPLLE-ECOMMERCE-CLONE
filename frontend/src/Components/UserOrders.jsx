import React from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import { FaArrowLeft } from "react-icons/fa6";

function UserOrders() {
    return (
        <>
            <Topbar />
            <Navbar />

            <div className="user-orders-section">
                <div className="user-orders-details">
                    <h2 className="my-orders-heading">
                        <button ><FaArrowLeft className="arrow-left" /></button>
                        My Orders
                    </h2>

                    <div className="line"><hr /></div>

                </div>
            </div>
        </>
    )
}

export default UserOrders