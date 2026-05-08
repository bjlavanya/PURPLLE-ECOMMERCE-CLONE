import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { GrTableAdd } from "react-icons/gr";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

function AdminSidebars() {
    const navigate = useNavigate()
    const admin = localStorage.getItem("admin");
    const handleLogout = () => {
        localStorage.removeItem("admin")
        alert('Logout Successfully')
        navigate('/admin')
    }
    return (
        <>
            <div className="admin-layout">
                <div className="admin-sidebar">
                    <div className="admin-sidebar-content">
                        <div className="purplle-logo">
                            <img src="/images/purpllelogo.svg" alt="purplle-logo" />
                            <h1>Admin</h1>
                        </div>

                        <div className="admin-management">
                            <Link to='/admin/dashboard' className="admin-add-product admin-tasks">
                                <MdDashboard className="admin-icons" />
                                dashboard
                            </Link>

                            <Link to='/admin/addProducts' className="admin-add-product admin-tasks">
                                <BsDatabaseFillAdd className="admin-icons" />
                                add products
                            </Link>

                            <Link to='/admin/manageProducts' className="admin-manage-products admin-tasks">
                                <GrTableAdd className="admin-icons" />
                                manage products
                            </Link>

                            <Link to='/admin/manageOrders' className="admin-manage-orders admin-tasks">
                                <BiSolidMessageRoundedAdd className="admin-icons" />
                                manage orders
                            </Link>

                            <Link to='/admin/manageUsers' className="admin-manage-users admin-tasks">
                                <FaUsers className="admin-icons" />
                                manage users
                            </Link>

                            <Link to='/admin/manageContacts' className="admin-manage-users admin-tasks">
                                <FaUsers className="admin-icons" />
                                manage contacts
                            </Link>

                            <div onClick={handleLogout} className="admin-manage-users admin-tasks">
                                <MdLogout className="admin-icons" />
                                logout
                            </div>
                        </div>
                    </div>
                </div>

                <div className="admin-navbar">
                    <div className="admin-navbar-content">
                        <h4>Hello, Admin</h4>
                        <div onClick={handleLogout}><MdLogout className="admin-icons" /></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebars