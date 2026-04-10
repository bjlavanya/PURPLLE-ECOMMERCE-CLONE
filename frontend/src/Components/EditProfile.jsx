import Topbar from './Topbar'
import Navbar from './Navbar'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios'

function EditProfile() {
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({
    username: "",
    email: "",
    phonenumber: ""
  })

  useEffect(() => {
    if (userId) {
      axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/userData/${userId}`)
        .then(res => setUser({
          username: res.data.username || "",
          email: res.data.email || "",
          phonenumber: res.data.phonenumber || ""
        }))
        .catch(err => console.log(err))
    }
  }, [userId])

  const back = () => {
    navigate('/userProfile')
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.put(`https://purplle-ecommerce-clone-backend.onrender.com/editProfile/${userId}`, {
        username: user.username,
        phonenumber: user.phonenumber
      });

      alert("Profile Updated");
      navigate("/userProfile");

    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  }

  return (
    <>
      <Topbar />
      <Navbar />

      <div className="edit-user-profile">
        <div className="edit-user-details">
          <div className="my-orders edit-user">
            <h2 className="my-orders-heading">
              <button onClick={back}><FaArrowLeft className="arrow-left" style={{ cursor: 'pointer' }} /></button>
              Edit Profile
            </h2>

            <div className="line"><hr /></div>
            <form action="" onSubmit={updateProfile}>
              <div className="edit-user-form">
                <div className="edit-form-details">
                  <label htmlFor="" className="form-items">Full Name</label>
                  <input type="text" name="username" id="username" value={user?.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </div>

                <div className="edit-form-details" style={{ backgroundColor: '#ded8d899' }}>
                  <label htmlFor="" className="form-items">Email</label>
                  <input type="text" name="email" id="email" value={user?.email} readOnly style={{ backgroundColor: '#f1f0f099' }} />
                </div>

                <div className="edit-form-details">
                  <label htmlFor="" className="form-items">Phone Number</label>
                  <input type="tel" pattern='[0-9]{10}' maxLength={10} name="phonenumber" id="phonenumber" value={user.phonenumber} onChange={(e) => setUser({ ...user, phonenumber: e.target.value })} />
                </div>

                <button className="update-btn" type='submit'>
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile