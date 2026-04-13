import { FaArrowLeft } from "react-icons/fa6";
import Topbar from './Topbar'
import Navbar from './Navbar'

function MyAddressView() {
    const back = () => {
        navigate(-1)
    }
    return (
        <>
            <Topbar />
            <Navbar />

            <div className="user-my-address">
                <div className="user-myaddress-details">
                    <div className="my-orders edit-user">
                        <h2 className="my-orders-heading">
                            <button onClick={back}><FaArrowLeft className="arrow-left" style={{ cursor: 'pointer' }} /></button>
                             My Address
                        </h2>

                        <div className="line"><hr /></div>

                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyAddressView