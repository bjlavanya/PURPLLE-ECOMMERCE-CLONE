import React from 'react'
import AdminSidebars from './AdminSidebars'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

function ManageContacts() {

  const [contacts, setContacts] = useState([])

  useEffect(() => {
    axios.get("https://purplle-ecommerce-clone-backend.onrender.com/manageContacts")
      .then(users => setContacts(users.data))
      .catch(err => console.log(err))
  }, [])

  const deleteContact = async (id) => {
     try {
      await axios.delete(
        `https://purplle-ecommerce-clone-backend.onrender.com/deleteContacts/${id}`
      )
      alert("Contact details Deleted")
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <AdminSidebars />

      <div className="admin-all-content-space">
        <div className="manage-table">
          <h3>Manage Contacts</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>User Email</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                contacts.map(contact => {
                  return <tr key={contact._id}>
                    <td>{contact.fullname}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phoneNumber}</td>
                    <td>{contact.location}</td>
                    <td>{contact.message}</td>
                    <td className='action-btn'>
                      <button onClick={() => deleteContact(contact._id)}><i className="fas fa-trash-alt delete"></i></button>
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