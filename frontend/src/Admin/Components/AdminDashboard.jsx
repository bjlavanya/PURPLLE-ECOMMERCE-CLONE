import React, { useEffect, useState } from 'react'
import AdminSidebars from './AdminSidebars';
import { FaRupeeSign } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { HiUsers } from "react-icons/hi";
import { FaBagShopping } from "react-icons/fa6";
import axios from 'axios'
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [revenue, setRevenue] = useState([])

  useEffect(() => {
    document.title = "Purplle Admin"
  }, [])

  useEffect(() => {
    axios.get("https://purplle-ecommerce-clone-backend.onrender.com/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get("https://purplle-ecommerce-clone-backend.onrender.com/manageOrders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get("https://purplle-ecommerce-clone-backend.onrender.com/manageUsers")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get("https://purplle-ecommerce-clone-backend.onrender.com/admin/revenue")
      .then(res => setRevenue(res.data.revenue))
      .catch(err => console.log(err))
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
                <p className="number">₨.{revenue}</p>
              </div>
            </div>

            <div className="total-orders-card card-size">
              <div className="admin-icon">
                <FaBagShopping className='icon' style={{ fontSize: '35px' }} />
              </div>
              <div className="admin-content">
                <p className="heading">Total Orders</p>
                <p className="number">{orders.length}</p>
              </div>
            </div>

            <div className="total-users-card card-size">
              <div className="admin-icon">
                <HiUsers className='icon' style={{ fontSize: '45px' }} />
              </div>
              <div className="admin-content">
                <p className="heading">Total Users</p>
                <p className="number">{users.length}</p>
              </div>
            </div>

            <div className="total-products-card card-size">
              <div className="admin-icon">
                <LuPackage className='icon' style={{ fontSize: '35px' }} />
              </div>
              <div className="admin-content">
                <p className="heading">Total Products</p>
                <p className="number">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="admin-chart">
            <div className="revenue-chart">
              <ResponsiveContainer width="100%" height={300}>

                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="date" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8e44ad"
                    strokeWidth={3}
                    name="Revenue"
                  />

                </LineChart>

              </ResponsiveContainer>
            </div>
            
            <div className="order-details">

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard