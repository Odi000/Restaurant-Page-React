import { useRef, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { Socials } from "./Footer"
import sideBarImg from "/images/sidebar.jpg"
import { Meals } from "./Homepage"

function SideBar({ sidebarRef }) {
    const { ourMenuRef } = useContext(Meals);

    function scrollToMenu() {
        handleClose()
        
        ourMenuRef.current.scrollIntoView({
            behavior: "smooth",
        })

    }

    function handleClose() {
        sidebarRef.current.classList.remove("open");
        document.body.style.overflow = "visible";
    }

    return (
        <div className="sidebar" ref={sidebarRef}>
            <div className="image"><img src={sideBarImg} /></div>
            <div className="options">
                <div className="links">
                    <Link onClick={scrollToMenu} >MENU</Link>
                    <Link>LOCATIONS</Link>
                    <Link>BOOKINGS</Link>
                    <Link to="careers" onClick={handleClose}>CAREERS</Link>
                    <Link>CONTACT</Link>
                </div>
                <Socials></Socials>
                <button className="close" onClick={handleClose}>×</button>
            </div>
        </div>
    )
}

export default SideBar;