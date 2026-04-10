import Topbar from './Topbar'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

function MyAddressForm() {
    const navigate = useNavigate()

    const back = () => {
        navigate('/userProfile')
    }
    return (
        <>
            <Navbar />

            <div className="user-my-address">
                <div className="user-myaddress-details">
                    <div className="my-orders edit-user">
                        <h2 className="my-orders-heading">
                            <button onClick={back}><FaArrowLeft className="arrow-left" style={{ cursor: 'pointer' }} /></button>
                            Add Address
                        </h2>

                        <div className="line"><hr /></div>

                        <p className="deliver-to">Deliver To</p>
                        <p className="address-info">Address Info</p>

                        <div className="edit-user-form">
                            <div className="edit-form-details">
                                <label htmlFor="" className="form-items">Pincode *</label>
                                <input type="text" name="pincode" id="pincode" required />
                            </div>

                            <div className="myaddress-city-state">
                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">City *</label>
                                    <input type="text" name="city" id="city" required />
                                </div>

                                <div className="edit-form-details">
                                    <label htmlFor="" className="form-items">State *</label>
                                    <input type="text" name="state" id="state" required />
                                </div>
                            </div>

                            <div className="edit-form-details">
                                <label htmlFor="" className="form-items">Address *</label>
                                <input type="text" name="address" id="address" required />
                            </div>

                            <p className="contact-info">Contact Info</p>

                            <div className="edit-form-details">
                                <label htmlFor="" className="form-items">Name *</label>
                                <input type="text" name="name" id="name" required />
                            </div>

                            <div className="edit-form-details">
                                <label htmlFor="" className="form-items">Phone Number *</label>
                                <input type="tel" pattern='[0-9]{10}' maxLength={10} name="phoneNumber" id="phoneNumber" required />
                            </div>

                            <button className="update-btn">
                                Save Address
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyAddressForm