import React, { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebars from './AdminSidebars';
import { useState } from 'react';
import axios from 'axios'

function EditStatus() {

    const [orderStatus, setOrderStatus] = useState("")

    const navigate = useNavigate()

    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`http://127.0.0.1:3001/updateOrderStatus/${id}`, {
                orderStatus
            });
            alert("Status Updated and mail sent");
            navigate("/admin/manageOrders");

        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    }

    return (
        <>
            <AdminSidebars />
            <div className="admin-all-content-space admin-products">

                <div className="admin-add-products">
                    <form className="add-products-form admin-form" onSubmit={handleSubmit}>
                        <h1>Edit Status</h1>

                        <div className="products-form-data">

                            <div className="form-row">
                                <label>Order Status</label>
                                <select name="status" onChange={(e) => setOrderStatus(e.target.value)} value={orderStatus} required>
                                    <option value="">Select Status</option>
                                    <option value="Order Processing">Order Processing</option>
                                    <option value="Order Delivered">Order Delivered</option>
                                </select>
                            </div>

                        </div>
                        <button type="submit" className='add-product-button admin-button'>UPDATE STAUTS</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default EditStatus