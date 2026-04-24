import React from "react";
import { Link } from "react-router-dom";

function Topbar() {
    return(
    <>
        <div className="topbar">
            <div className="rightLink">
                <a href="https://bnc.lt/m/xLJmQCwBwN?_p=c11135dc9d0a7af1fc1c8bf8">
                    <i className="fa-solid fa-mobile-screen"></i>  
                    &nbsp;DOWNLOAD APP
                </a>   
                     |
                <Link to='/supportContactForm'>
                    <i className="fa-solid fa-circle-info"></i>
                     &nbsp; SUPPORT
                </Link>    
                      |
                <a href="#" id="tractOrder" style={{ marginRight: "90px" }}>
                    <i className="fa-solid fa-truck"></i>  
                    &nbsp;TRACK ORDER
                </a>
            </div>
        </div>
    </>
    );
}

export default Topbar;