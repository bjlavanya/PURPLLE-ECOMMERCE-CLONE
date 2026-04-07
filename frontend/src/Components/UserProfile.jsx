import React from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import { PiHeadsetLight } from "react-icons/pi";
import { PiPackageThin } from "react-icons/pi";

function UserProfile() {

  const userId = localStorage.getItem("userId");

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="user-profile">

        {
          userId ? (
            <>
              <div className="user-profile-details">
                <div className="user-account">
                  <h4>Guest</h4>
                  <span className="email">lavanyabj234455@gmail.com</span> <span>|</span> <span className="phone-number">899078867</span>
                </div>
                <div className="user-profile-icon">
                  <img src="/images/user-profile-icon.webp" alt="" />
                </div>
              </div>
              <div className="user-profile-details">
                <button className='edit-profile'>Edit Profile</button>
              </div>
            </>
          ) : (
            <div className="user-profile-details">
              <div className="user-account">
                <h4>Hey there!</h4>
                <p className='before-login-user'>Login/Signup to manage your orders and a lot more</p>
                <button className='login-signup'>Login/Signup</button>
              </div>
            </div>
          )
        }

        <div className="my-order-part">
          <div className="my-order-div">
            <div className="my-order">
              <div className="icons">
                <PiPackageThin className='userprofile-icon' />
              </div>
              <div className="order-words">
                <p className='order-heading'>My Orders</p>
                <p className='order-desp'>Track your placed orders</p>
              </div>

            </div>
            <p className='gt'>&gt;</p>
          </div>

          <div className="my-order-div">
            <div className="my-order">
              <div className="icons">
                <PiHeadsetLight className='userprofile-icon' />
              </div>
              <div className="order-words">
                <p className='order-heading'>Customer Support </p>
                <p className='order-desp'>Help regarding any doubts</p>
              </div>

            </div>
            <p className='gt'>&gt;</p>
          </div>
        </div>

        {
          userId ? (
            <div className="user-profile-details">
              <button className='logout'>Logout</button>
            </div>
          ) : (
            <>
            </>
          )
        }

      </div>
    </>
  )
}

export default UserProfile