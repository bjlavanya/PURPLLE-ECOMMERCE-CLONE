import React, { useEffect } from 'react'
import AdminSidebars from './AdminSidebars';
import { FaRupeeSign } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { HiUsers } from "react-icons/hi";
import { FaBagShopping } from "react-icons/fa6";

function AdminDashboard() {
  useEffect(() => {
    document.title = "Purplle Admin"
  }, [])

  return (
    <>
      <AdminSidebars />
      <div className="admin-all-content-space">
        <div className="admin-dashboard">
          <div className="admin-heading">
            <p className="dashboard">Dashboard</p>
            <p className="subtitle">Welcome back! Here’s a quick look at your store activity.</p>
          </div>

          <div className="dashboard-cards">
            <div className="total-revenue-card card-size">
              <div className="admin-icon">
                <FaRupeeSign className='icon' />
              </div>
              <div className="admin-content">
                <p className="heading">Total Revenue</p>
                <p className="number">₨.2000</p>
              </div>
            </div>

            <div className="total-orders-card card-size">
              <div className="admin-icon">
                <FaBagShopping className='icon' style={{fontSize:'35px'}} />
              </div>
              <div className="admin-content">
                <p className="heading">Total Orders</p>
                <p className="number">20</p>
              </div>
            </div>

            <div className="total-users-card card-size">
              <div className="admin-icon">
                <HiUsers className='icon' style={{fontSize:'45px'}} />
              </div>
              <div className="admin-content">
                <p className="heading">Total Users</p>
                <p className="number">6</p>
              </div>
            </div>

            <div className="total-products-card card-size">
              <div className="admin-icon">
                <LuPackage className='icon' style={{fontSize:'35px'}}  />
              </div>
              <div className="admin-content">
                <p className="heading">Total Products</p>
                <p className="number">30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard