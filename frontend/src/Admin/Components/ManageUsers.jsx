import React from 'react'
import AdminSidebars from './AdminSidebars'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

function ManageUsers() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/manageUsers")
      .then(users => setUsers(users.data))
      .catch(err => console.log(err))
  }, [])

  const deleteUser = async (id) => {
    axios.delete(`http://127.0.0.1:3001/deleteUsers/${id}`)
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
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                users.map(user => {
                  return <tr key={user._id}>
                    <td>{user.email}</td>
                    <td className='action-btn'>
                      <Link ><i className="fas fa-edit edit"></i></Link>
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

export default ManageUsers