import React, { useState } from 'react'
import { CiCircleInfo } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import OtpForm from './OtpForm';


function Login({ closeModal }) {
  const location = useLocation();

  const [email, setEmail] = useState(
    location.state?.email || ""
  );
  const [showOtpForm, setShowOtpForm] = useState(false);

  const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post(
            'http://127.0.0.1:3001/login/sendOtp',
            { email }
            );

            setShowOtpForm(true);

        } catch (err) {
            console.log("Send OTP Error:", err.response?.data || err.message);
        }
    };
  return (
    <>
        <div className="login-wrapper"></div>
        <div className="login">

            {!showOtpForm ? (
            <form action="" className='login-form' onSubmit={handleSubmit}>
                <button className="close" onClick={closeModal}>
                    <IoMdClose />
                </button>

                <img src="public/images/logintopImage.webp" alt="LoginLogo" />
                
                <h3 className='login-heading'>Login or Signup</h3><br />

                <input 
                    type="email" 
                    id="contact" 
                    name="contact" 
                    className="contact" 
                    placeholder="Enter email address"
                    value={email}  
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <button type="submit" className='continue-btn'>CONTINUE</button>

                <div className="policies" style={{ display: 'flex', flexDirection: 'row' }}>
                    <input type="checkbox" className="policy" id="policy"  style={{ marginLeft: '-60px' }} />
                    <h5>Allow shiprocket to fetch address based on past orders</h5>
                    <h6><CiCircleInfo /></h6>   
                </div>
            
                <p className="stmt">By creating an account or logging in, you agree to Purplle's <a href="">Terms of Use, Privacy Policy</a> and Shiprocket's <a href="">Terms of Use</a>, Privacy Policy and consent to the collection and use of your personal information/sensitive personal data or information.</p>
            </form>
            ) : (
                <OtpForm length={6} 
                email={email}
                setShowOtpForm = {setShowOtpForm}
                closeModal={closeModal}
                />
            )}

            
        </div>
    </>
  )
}

export default Login;