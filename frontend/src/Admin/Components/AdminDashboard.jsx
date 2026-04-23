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

  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    if (orders.length === 0) return;

    const revenueMap = {};

    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 6);

    orders.forEach(order => {

      if (order.paymentStatus === "Success") {

        const orderDate = new Date(order.orderDate);

        if (orderDate >= lastWeek && orderDate <= today) {

          const date =
            `${orderDate.getDate()}/${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;

          if (!revenueMap[date]) {
            revenueMap[date] = 0;
          }

          revenueMap[date] += order.totalAmount;

        }
      }

    });

    const data = Object.keys(revenueMap).map(date => ({
      date: date,
      amount: revenueMap[date]
    }));

    setChartData(data);

  }, [orders]);

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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#fff",
            padding: '4px 4px',
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            textAlign: "left",
            width: '120px',
          }}
        >
          <p style={{
            margin: 0,
            fontSize: "11px",
            color: "#888",
            fontWeight: "400"
          }}>
            {label}
          </p>
          <p style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: "bold",
            color: "#9c00ad"
          }}>
            Amount: ₹{payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

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
            <div className="revenue-chart" >
              <h1 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Revenue</h1>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    dataKey="date"
                    axisLine={{ stroke: "#d1d5db" }}   // bottom line only
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />

                  <YAxis
                    axisLine={{ stroke: "#d1d5db" }}   // left line only
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />

                  <Tooltip content={CustomTooltip} cursor={{ stroke: "#ddd" }} isAnimationActive={false}  />

                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8e24aa"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#fff",
                      stroke: "#8e24aa",
                      strokeWidth: 3
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#fff",
                      stroke: "#8e24aa",
                      strokeWidth: 3
                    }}
                  />

                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard