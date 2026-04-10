import Topbar from './Topbar'
import Navbar from './Navbar'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, Link } from 'react-router-dom';

function EditProfile() {
  const navigate = useNavigate()

  const back = () => {
    navigate('/userProfile')
  }

  return (
    <>
      <Topbar />
      <Navbar />

      <div className="edit-user-profile">
        <div className="edit-user-details">
          <div className="my-orders edit-user">
            <h2 className="my-orders-heading">
              <button onClick={back}><FaArrowLeft className="arrow-left" style={{cursor:'pointer'}} /></button>
              Edit Profile
            </h2>

            <div className="line"><hr /></div>

            <div className="edit-user-form">
              <div className="edit-form-details">
                <label htmlFor="" className="form-items">Full Name</label>
                <input type="text" name="fullName" id="fullName" />
              </div>

              <div className="edit-form-details">
                <label htmlFor="" className="form-items">Email</label>
                <input type="text" name="email" id="email" />
              </div>

              <div className="edit-form-details">
                <label htmlFor="" className="form-items">Phone Number</label>
                <input type="tel"  pattern='[0-9]{10}' maxLength={10} name="phoneNumber" id="phoneNumber" />
              </div>

              <button className="update-btn">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile