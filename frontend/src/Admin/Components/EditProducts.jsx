import React, { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebars from './AdminSidebars';
import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

function EditProducts() {
    const [image, setImage] = useState(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [newprice, setNewprice] = useState("")
    const [oldprice, setOldprice] = useState("")
    const [discount, setDiscount] = useState("")
    const [quantity, setQuantity] = useState()
    const [highlights, setHighlights] = useState()
    const [category, setCategory] = useState("")

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        axios.get(`https://purplle-ecommerce-clone-backend.onrender.com/imageUpload/${id}`)
        .then((res) => {
            const data = res.data

            setImage(data.productImage) 
            setName(data.productName)
            setDescription(data.productDescription)
            setNewprice(data.newPrice)
            setOldprice(data.oldPrice)
            setDiscount(data.discount)
            setQuantity(data.productQuantity)
            setHighlights(data.highlights)
            setCategory(data.category)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()

        // appending form data 
        const formdata = new FormData()
        formdata.append("image", image) //index.js --- image is created variable -1st args and 2nd one is state variable
        formdata.append("productName", name)
        formdata.append("productDescription", description)
        formdata.append("newPrice", newprice)
        formdata.append("oldPrice", oldprice)
        formdata.append("discount", discount)
        formdata.append("productQuantity", quantity)
        formdata.append("highlights", highlights)
        formdata.append("category", category)

        fetch(`https://purplle-ecommerce-clone-backend.onrender.com/imageUpload/${id}`, {
            method: "put",
            body: formdata
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.msg)
            toast.success("Product Updated")
            navigate("/admin/manageProducts")

        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <AdminSidebars />
            <div className="admin-all-content-space admin-products">

                <div className="admin-add-products">
                    <form className="add-products-form admin-form" onSubmit={handleSubmit}>
                        <h1>Edit Products</h1>

                        <div className="products-form-data">

                             {/* <div className="form-row">
                                {preview && (
                                <img src={`http://127.0.0.1:3001/imageUpload/${preview}`} alt="" />
                                )}
                            </div> */}

                            <div className="form-row">
                                <label>Product Image</label>
                                <input 
                                type="file" 
                                name="image-upload" 
                                id="image-upload" 
                                onChange={(e) => {setImage(e.target.files[0])
                                }}
                                
                                />
                            </div>

                            <div className="form-row">
                                <label>Product Name</label>
                                <input 
                                type="text" 
                                name="product-name" 
                                placeholder="Enter product name" 
                                value={ name }
                                onChange={(e) => setName(e.target.value)}
                                required
                                />
                            </div>

                            <div className="form-row">
                                <label>Product Description</label>
                                <input 
                                type="text" 
                                name="product-description" 
                                placeholder="Enter Product Description" 
                                value={ description }
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                />
                            </div>

                            <div className="form-row">
                                <label>Product New Price</label>
                                <input 
                                type="number" 
                                name="new-price" 
                                placeholder="Enter new price" 
                                value={ newprice }
                                onChange={(e) => setNewprice(e.target.value)}
                                required
                                />
                            </div>

                            <div className="form-row">
                                <label>Product Old Price</label>
                                <input 
                                type="number" 
                                name="old-price" 
                                placeholder="Enter old price" 
                                value={ oldprice }
                                onChange={(e) => setOldprice(e.target.value)}
                                required
                                />
                            </div>

                            <div className="form-row">
                                <label>Discount Amount</label>
                                <input 
                                type="number" 
                                name="discount" 
                                placeholder="Enter discount" 
                                value={ discount }
                                onChange={(e) => setDiscount(e.target.value)}
                                required
                                />
                            </div>

                            <div className="form-row">
                                <label>Product Quantity</label>
                                <input 
                                type="number" 
                                name="quantity" 
                                placeholder="Enter quantity" 
                                value={ quantity }
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                                />
                            </div>

                            <div className="form-row">
                                <label>Highlights</label>
                                <input 
                                type="text" 
                                name="discount" 
                                placeholder="Enter Highlights" 
                                value={ highlights }
                                onChange={(e) => setHighlights(e.target.value)}
                                required
                                />
                            </div>

                            <div className="form-row">
                                <label>Product Category</label>
                                <select name="category" onChange={(e) => setCategory(e.target.value)} value={ category } required>
                                    <option value="">Select Category</option>
                                    <option value = "Handpicked Products">Handpicked Products</option>
                                    <option value = "Best Sellers">Best Sellers</option>
                                    <option value = "Editors pick">Editors pick</option>
                                    <option value = "Budget Beauty">Budget Beauty</option>
                                    <option value = "Curated Products">Curated Products</option>
                                    <option value = "Essentials">Essentials</option>
                                    <option value = "Lakme">Lakme</option>
                                    <option value = "Product Ads1">Product Ads1</option>
                                    <option value = "Product Ads2">Product Ads2</option>
                                    <option value = "Product Ads3">Product Ads3</option>
                                </select>
                            </div>

                        </div>
                        <button type="submit" className='add-product-button admin-button'>UPDATE</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default EditProducts