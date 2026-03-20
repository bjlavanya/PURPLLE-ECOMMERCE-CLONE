import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'

function AdminLogin() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Purplle Admin"
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           if(email === 'purplle.admin@gmail.com' && password === "purplle-admin") {
            alert("Purplle-Admin Login Successfully")
            navigate('/admin/dashboard')
           }
           else {
            alert("Login Failed")
           }
        } catch (err) {
            console.log("Error:", err);
        }
    };

    return (
        <>
            <div className="admin-login">
                <form className="admin-form" onSubmit={handleSubmit}>
                    <h1>Purplle Admin</h1>
                    <h4>Login to Purplle Admin Dashboard</h4>
                    
                    <input 
                    type="email" 
                    name="admin-email" 
                    id="admin-email" 
                    placeholder='Enter admin email address' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    /> <br /> 

                    <input 
                    type="password" 
                    name="admin-password" 
                    id="admin-password" 
                    placeholder='Enter admin password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />

                    <button type="submit" className='admin-button'>LOGIN</button>
                </form>
            </div>
        </>
    )
}

export default AdminLogin