import AdminSidebars from './AdminSidebars';
import { useState } from 'react';
function AddProducts() {
    const [image, setImage] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [newprice, setNewprice] = useState()
    const [oldprice, setOldprice] = useState()
    const [discount, setDiscount] = useState()
    const [quantity, setQuantity] = useState()
    const [highlights, setHighlights] = useState()
    const [category, setCategory] = useState()

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

        fetch('https://purplle-ecommerce-clone-backend.onrender.com/imageUpload', {
            method: "POST",
            body: formdata
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.msg)
            alert("Product added")

            setImage(null)
            setName("")
            setDescription("")
            setNewprice("")
            setOldprice("")
            setDiscount("")
            setQuantity("")
            setHighlights("")
            setCategory("")
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
                        <h1>Add Products</h1>

                        <div className="products-form-data">

                            <div className="form-row">
                                <label>Product Image</label>
                                <input 
                                type="file" 
                                name="image-upload" 
                                id="image-upload" 
                                onChange={(e) => setImage(e.target.files[0])}
                                required
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
                                <label>Quantity</label>
                                <input 
                                type="number" 
                                name="quantity" 
                                placeholder="Enter Quantity" 
                                value={ quantity }
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                                />
                            </div>

                            <div className="form-row">
                                <label>Product Highlights</label>
                                <input 
                                type="text" 
                                name="highlights" 
                                placeholder="Enter Product Highlights" 
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
                                </select>
                            </div>

                        </div>
                        <button type="submit" className='add-product-button admin-button'>ADD</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default AddProducts