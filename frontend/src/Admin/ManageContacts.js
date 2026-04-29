import React from 'react'
import AdminSidebars from './AdminSidebars'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

function ManageContacts() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("https://purplle-ecommerce-clone-backend.onrender.com/manageUsers")
      .then(users => setUsers(users.data))
      .catch(err => console.log(err))
  }, [])

  const deleteUser = async (id) => {
    axios.delete(`https://purplle-ecommerce-clone-backend.onrender.com/deleteUsers/${id}`)
    alert("User Deleted")
    window.location.reload();
  }

  return (
    <>
      <AdminSidebars />

      <div className="admin-all-content-space">
        <div className="manage-table">
          <h3>Manage Users</h3>
          <table border="1">
            <thead>
              <tr>
                <th>User Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                users.map(user => {
                  return <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>{user.phonenumber}</td>
                    <td className='action-btn'>
                      <button onClick={() => deleteUser(user._id)}><i className="fas fa-trash-alt delete"></i></button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ManageContacts