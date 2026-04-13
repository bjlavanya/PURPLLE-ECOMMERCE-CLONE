import { FaArrowLeft } from "react-icons/fa6";
import Topbar from './Topbar'
import Navbar from './Navbar'
import { PiSmileySadThin } from "react-icons/pi";
import { IoIosHome } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from 'axios'

function MyAddressView() {
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState({})

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

                        { userId ? (
                        <div className="manage-address">
                            <div className="address-home">
                                <IoIosHome className="address-home-icon" />
                            </div>

                            <div className="user-details">
                                <p className="username">{user?.username}</p>
                                <p className="address">Mangalore</p>
                                <p className="phonenumber">MOB: 96768694004</p>
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