import { Link } from "react-router-dom";
import Topbar from './Topbar'
import Navbar from './Navbar'
import { PiHeadsetLight } from "react-icons/pi";
import { PiPackageThin } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { useState, useEffect } from "react";
import axios from 'axios'
import Login from './Login'

function UserProfile() {
  const [showModal, setShowModal] = useState(false)
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({})

  useEffect(() => {
    if (userId) {
      axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/userData/${userId}`)
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    }
  }, [userId])

  const closeModal = () => {
    return setShowModal(false);
  }

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
                  <h4>{user?.username}</h4>
                  <span className="email">{user?.email}</span> <br /> <span className="phone-number">{user?.phonenumber}</span>
                </div>
                <div className="user-profile-icon">
                  <img src="/images/user-profile-icon.webp" alt="" />
                </div>
              </div>
              <div className="user-profile-details">
                <Link to='/userProfile/editProfile' className='edit-profile' >Edit Profile</Link>
              </div>
            </>
          ) : (
            <div className="user-profile-details">
              <div className="user-account">
                <h4>Hey there!</h4>
                <p className='before-login-user'>Login/Signup to manage your orders and a lot more</p>
                <button className='login-signup' onClick={() => setShowModal(true)}>Login/Signup</button>
                {showModal && <Login closeModal={closeModal} />}
              </div>
            </div>
          )
        }

        <div className="my-order-part">
          <Link className="my-order-div" to='/myOrders'>
            <div className="my-order">
              <div className="icons">
                <PiPackageThin className='userprofile-icon' />
              </div>
              <div className="order-words">
                <p className='order-heading'>My Orders</p>
                <p className='order-desp'>View and track all your orders</p>
              </div>

            </div>
            <p className='gt'>&gt;</p>
          </Link>

          <div className="my-order-div">
            <Link className="my-order" style={{textDecorationLine:'none'}} to='/userProfile/myOrders'>
              <div className="icons">
                <PiHeadsetLight className='userprofile-icon' />
              </div>
              <div className="order-words">
                <p className='order-heading'>Customer Support </p>
                <p className='order-desp'>Help regarding any doubts</p>
              </div>

            </Link>
            <p className='gt'>&gt;</p>
          </div>

          <Link className="my-order-div" to='/userProfile/myAddress/manage'>
            <div className="my-order">
              <div className="icons">
                <CiLocationOn className='userprofile-icon' />
              </div>
              <div className="order-words">
                <p className='order-heading'>My Address </p>
                <p className='order-desp'>Manage and view your saved delivery addresses.</p>
              </div>

            </div>
            <p className='gt'>&gt;</p>
          </Link>
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