import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Socials } from "./Footer"
import sideBarImg from "/images/sidebar.jpg"

function SideBar({ sidebarRef }) {

    function handleClose() {
        sidebarRef.current.classList.remove("open");
        document.body.style.overflow = "visible";
    }

    return (
        <div className="sidebar" ref={sidebarRef}>
            <div className="image"><img src={sideBarImg} /></div>
            <div className="options">
                <div className="links">
                    <Link>MENU</Link>
                    <Link>LOCATIONS</Link>
                    <Link>BOOKINGS</Link>
                    <Link>CAREERS</Link>
                    <Link>CONTACT</Link>
                </div>
                <Socials></Socials>
                <button className="close" onClick={handleClose}>×</button>
            </div>
        </div>
    )
}

export default SideBar;