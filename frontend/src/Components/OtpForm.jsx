import { useEffect, useRef } from 'react'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function OtpForm({ length = 6, email, setShowOtpForm, closeModal, loginFromCheckout }) {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const [errorMessage, setErrorMessage] = useState("");
    const [timer, setTimer] = useState(30);
    const navigate = useNavigate();
    const [showResend, setShowResend] = useState(false);
    const inputRefs = useRef([]);

    const handleEdit = () => {
        setShowOtpForm(false);
    }

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    useEffect(() => {
        if (timer === 0) {
            setShowResend(true);
            return;
        }

        const time = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(time);
    }, [timer]);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        //allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        setErrorMessage("");

        //move to next input
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    }

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);
    }

    const handleKeyDown = (index, e) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            //Move focus
            inputRefs.current[index - 1].focus();
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");

        if (enteredOtp.length !== length) {
            setErrorMessage("Please enter complete OTP");
            return;
        }

        try {
            const response = await axios.post("https://purplle-ecommerce-clone-backend.onrender.com/login/verifyOtp", {
                email,
                otp: enteredOtp
            });

            // localStorage.setItem('userEmail', JSON.stringify(email)) // storing useremail at local storage - browser

            // localStorage.setItem("userId", response.data.userId);

            const userId = response.data.userId;

            localStorage.setItem("userId", userId);

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart = cart.map(item => {
                if (!item.userId) {
                    return { ...item, userId: userId };
                }
                return item;
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            console.log("Response:", response.data);
            alert("Login Successfully")

            if (loginFromCheckout) {

                const res = await axios.get(
                    `https://purplle-ecommerce-clone-backend.onrender.com/manageUsers/${userId}`
                );

                if (!res.data.address || res.data.address.length === 0) {
                    closeModal()
                    navigate('/userprofile/myAddressForm');
                } else {
                    setShowOtpForm(false)
                    closeModal()
                    navigate('/addToCart', { state: { openPayment: true } });
                }

            } else {
                window.location.reload()
            }

        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Something went wrong");
            }
        }
    };

    const handleResendOtp = async () => {
        try {
            await axios.post("https://purplle-ecommerce-clone-backend.onrender.com/login/sendOtp", {
                email,
            });

            setTimer(30);
            setShowResend(false);

        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Something went wrong");
            }
        }
    }

    return (
        <>
            <form className='login-form' onSubmit={handleVerify}>
                <button type="button" className="close" onClick={closeModal}>
                    <IoMdClose />
                </button>
                <div className="otp-heading">
                    <p>Please enter the OTP we've sent you on your email address</p>
                </div>

                <div className="email-edit">
                    <p className="email-text">{email}</p>
                    <button type="button" className="edit" onClick={handleEdit}>Edit</button>
                </div>

                <div className='otp-section'>
                    {otp.map((value, index) => {
                        return (
                            <input
                                key={index}
                                type="text"
                                className="otp-input"
                                ref={(input) => (inputRefs.current[index] = input)}
                                value={value}
                                onChange={(e) => handleChange(index, e)}
                                onClick={() => handleClick(index)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                        );
                    })}
                </div>

                <div className="resend">
                    {errorMessage &&
                        <h6>{errorMessage}</h6>
                    }

                    {!showResend ? (
                        <p style={{ color: '#2c414c' }}>
                            Resend OTP in  {timer} seconds
                        </p>
                    ) : (
                        <p className='resend-link' onClick={handleResendOtp}>
                            Resend OTP
                        </p>
                    )
                    }
                </div>

                <div className="verify-button">
                    <button type='submit'>VERIFY</button>
                </div>
            </form>
        </>
    )
}

export default OtpForm