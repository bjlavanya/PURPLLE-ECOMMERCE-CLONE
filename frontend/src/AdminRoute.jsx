import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from './Admin/Components/AdminLogin'
import AdminDashboard from './Admin/Components/AdminDashboard'
import AddProducts from './Admin/Components/AddProducts'
import ManageProducts from './Admin/Components/ManageProducts'
import ManageUsers from './Admin/Components/ManageUsers'
import EditProducts from './Admin/Components/EditProducts'
import ManageOrders from './Admin/Components/ManageOrders'
import EditStatus from './Admin/Components/EditStatus'

function AdminRoute() {
        useEffect(() => {
            document.title = "Purplle Admin"
        }, [])
    
    return(
        <>
            <Routes>
                <Route index element={<AdminLogin />} />
                <Route path='dashboard' element={<AdminDashboard />} />
                <Route path='addProducts' element={<AddProducts />} />
                <Route path='manageProducts' element={<ManageProducts />} />
                <Route path='editProducts/:id' element={<EditProducts />} />
                <Route path='manageOrders' element={<ManageOrders />} />
                <Route path='editStatus/:id' element={<EditStatus />} />
                <Route path='manageUsers' element={<ManageUsers />} />
            </Routes>
        </>
    )
}

export default AdminRoute