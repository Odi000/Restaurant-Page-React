import { Link } from "react-router-dom";
import { useRef } from "react";
import SideBar from "./SideBar";

function Navbar() {
    return (
        <nav>
            <Logo></Logo>
            <div>
                <CenterLinks></CenterLinks>
                <MainLinks></MainLinks>
                <Hamburger></Hamburger>
            </div>
        </nav>
    )
}

function Logo() {
    return (
        <div style={{ width: "75px", height: "132px", backgroundColor: "#ff000094" }}></div>
    )
}

function CenterLinks() {
    return (
        <div className="centerLinks">
            <Link>MENU</Link>
            <Link>LOCATIONS</Link>
            <Link>OUR STORY</Link>
            <Link>GIFT VOUCHERS</Link>
        </div>
    )
}

function MainLinks() {
    return (
        <div className="mainLinks">
            <Link>Book a Table</Link>
            <Link>Find a Dzo</Link>
        </div>
    )
}

function Hamburger() {
    const sidebarRef = useRef(null);

    function handleOpen(){
        sidebarRef.current.classList.add("open");
        document.body.style.overflow = "hidden"
    }

    return (
        <>
            <div onClick={handleOpen} style={{ width: "65px", height: "65px", backgroundColor: "#ff000094" }}></div>
            <SideBar sidebarRef={sidebarRef}></SideBar>
        </>
    )
}

export default Navbar;