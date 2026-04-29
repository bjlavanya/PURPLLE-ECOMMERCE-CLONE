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
  CartesianGrid, PieChart, Pie, Cell,
  BarChart,
  Bar, AreaChart,
  Area,
} from "recharts";

function AdminDashboard() {

  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [revenue, setRevenue] = useState([])
  const [statusData, setStatusData] = useState([]);
  const [barData, setBarData] = useState([])
  const [topProducts, setTopProducts] = useState([]);

  const COLORS = ["#FFC20A", "#17BECF", "#4caf50"];

  useEffect(() => {
    document.title = "Purplle Admin"
  }, [])

  const [chartData, setChartData] = useState([]);
  const [areaChart, setAreaChart] = useState([])

  useEffect(() => {
    axios.get("https://purplle-ecommerce-clone-backend.onrender.com/top-products")
      .then(res => setTopProducts(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {

    const revenueMap = {};
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      revenueMap[date] = 0;
    }

    orders.forEach(order => {
      if (order.paymentStatus === "Success") {
        const orderDate = new Date(order.orderDate);
        const date =
          `${orderDate.getDate()}/${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;

        if (revenueMap[date] !== undefined) {
          revenueMap[date] += order.totalAmount;
        }

      }

    });

    const data = Object.keys(revenueMap).map(date => ({
      date,
      amount: revenueMap[date]
    }));

    setChartData(data);

  }, [orders]);

  useEffect(() => {

    const revenueMap = {};
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      revenueMap[date] = 0;
    }

    orders.forEach(order => {

      const orderDate = new Date(order.orderDate);
      const date =
        `${orderDate.getDate()}/${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;

      if (revenueMap[date] !== undefined) {
        revenueMap[date] += 1;
      }

    });

    const data = Object.keys(revenueMap).map(date => ({
      date,
      amount: revenueMap[date]
    }));

    setAreaChart(data);

  }, [orders]);

  useEffect(() => {

    const statusCount = {
      Pending: 0,
      Processing: 0,
      Delivered: 0
    };

    orders.forEach(order => {

      if (order.orderStatus === "Pending") {
        statusCount.Pending += 1;
      }

      else if (order.orderStatus === "Order Processing") {
        statusCount.Processing += 1;
      }

      else if (order.orderStatus === "Order Delivered") {
        statusCount.Delivered += 1;
      }

    });

    const data = [
      { name: "Pending", value: statusCount.Pending },
      { name: "Processing", value: statusCount.Processing },
      { name: "Delivered", value: statusCount.Delivered }
    ];

    setStatusData(data);

  }, [orders]);

  // useEffect(() => {
  //   const monthlyOrders = {};

  //   orders.forEach(order => {
  //     const month = new Date(order.orderDate).toLocaleString(
  //       "default",
  //       { month: "short" }
  //     );

  //     if (!monthlyOrders[month]) {
  //       monthlyOrders[month] = 0;
  //     }

  //     monthlyOrders[month] += 1;
  //   });

  //   const formattedData = Object.keys(monthlyOrders).map(month => ({
  //     month,
  //     orders: monthlyOrders[month]
  //   }));

  //   setBarData(formattedData);

  // }, [orders]);

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

  const LineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "transparent",
            padding: '4px 4px',
            borderRadius: "8px",
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

  const AreaTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "transparent",
            padding: '4px 4px',
            borderRadius: "8px",
          }}
        >

          <p style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: "bold",
            color: "#9c00ad"
          }}>
            Orders: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "transparent",
            padding: "4px 6px",
            fontSize: "12px",
          }}
        >
          <p style={{ margin: 0, color: '#9c00ad' }}>
            {payload[0].name}: <b>{payload[0].value}</b>
          </p>
        </div>
      );
    }
    return null;
  };

  const BarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "transparent",
            padding: '4px 4px',
            borderRadius: "8px",
          }}
        >
          <p style={{
            margin: 0,
            fontSize: "11px",
            color: "#000",
            fontWeight: "400"
          }}>
            {label}
          </p>
          <p style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: "bold",
            color: "#000"
          }}>
            Orders: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  }

  const CustomizedAxisTick = ({ x, y, payload }) => {
    return (
      <text
        x={x}
        y={y + 10}
        textAnchor="middle"
        fill="#555"
      >
        <tspan x={x} dy="0">{payload.value.split(" ")[0]}</tspan>
        <tspan x={x} dy="15">{payload.value.split(" ").slice(1).join(" ")}</tspan>
      </text>
    );
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
              <h1>Revenue Details(last 7 days)</h1>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }} >

                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

                  <XAxis
                    dataKey="date"
                    axisLine={{ stroke: "#d1d5db" }}
                    interval={0}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />

                  <YAxis
                    axisLine={{ stroke: "#d1d5db" }}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />

                  <Tooltip content={LineTooltip} cursor={{ stroke: "#ddd" }} isAnimationActive={false} />

                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8e24aa"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: "#fff",
                      stroke: "#8e24aa",
                      strokeWidth: 1
                    }}

                  />

                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="revenue-chart" >
              <h1>Pie Chart of Order Status</h1>
              <ResponsiveContainer width="100%" height={380} margin={30}>
                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>

                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="42%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Legend verticalAlign="bottom" align="center" />
                  <Tooltip content={<PieTooltip />} />

                </PieChart>
              </ResponsiveContainer>

            </div>
          </div>

          <div className="admin-chart">
            <div className="revenue-chart">
              <h1>Top 5 Selling Products</h1>

              <ResponsiveContainer width="100%" height={360}>
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="productName" interval={0} tick={<CustomizedAxisTick/>} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="sales"
                    fill="#bb26cb"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="revenue-chart" >
              <h1>Total orders each day</h1>
              <ResponsiveContainer width="100%" height={280} margin={20}>
                <AreaChart width={500} height={600} data={areaChart}>
                  <CartesianGrid />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={AreaTooltip} />
                  <Area
                    dataKey="amount"
                    stackId="1"
                    stroke="black"
                    fill="#9c00ad"
                  />

                </AreaChart>
              </ResponsiveContainer>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard