import React, { useEffect } from 'react'
import AdminSidebars from './AdminSidebars';

function AdminDashboard() {
  useEffect(() => {
    document.title = "Purplle Admin"
  }, [])

  return (
    <>
      <AdminSidebars />
      <div className="admin-all-content-space">
        <div className="admin-dashboard">
          <img src="\images\admin-banner.png" alt="" />
        </div>
      </div>
    </>
  )
}

export default AdminDashboard