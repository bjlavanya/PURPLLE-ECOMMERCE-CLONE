import { FaArrowLeft } from "react-icons/fa6";
import Topbar from './Topbar'
import Navbar from './Navbar'
import { PiSmileySadThin } from "react-icons/pi";
import { IoIosHome } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function MyAddressView() {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState({})
    const address = user?.address?.[user?.address?.length - 1]

    useEffect(() => {
        if (userId) {
            axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/manageUsers/${userId}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err))
        }
    }, [userId])


    const back = () => {
        navigate(-1)
    }
    return (
        <>
            <Topbar />
            <Navbar />

            <div className="user-my-address">
                <div className="user-myaddress-details">
                    <div className="my-orders edit-user">
                        <h2 className="my-orders-heading">
                            <button onClick={back}><FaArrowLeft className="arrow-left" style={{ cursor: 'pointer' }} /></button>
                            My Address
                        </h2>

                        <div className="line"><hr /></div>

                        { address?.pincode  ? (
                        <div className="manage-address">
                            <div className="address-home">
                                <IoIosHome className="address-home-icon" />
                            </div>

                            <div className="user-details">
                                <p className="username">{user?.username}</p>
                                <p className="address">{address.location}, {address.city}, {address.state} - {address.pincode}</p>
                                <p className="phonenumber">MOB: {user?.phonenumber}</p>
                            </div>
                        </div>
                        ) : (
                        <div className="no-address-div">
                            <PiSmileySadThin className="smile-address" />
                            <div className="no-address-para">
                                No Saved Address yet
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyAddressView