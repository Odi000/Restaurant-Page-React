import { Link } from "react-router-dom";
import { useRef } from "react";
import SideBar from "./SideBar";
import styles from "./css_modules/Navbar.module.css";

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.wrapper}>
                <Logo></Logo>
                <div className={styles.links}>
                    <CenterLinks></CenterLinks>
                    <MainLinks></MainLinks>
                    <Hamburger></Hamburger>
                </div>
            </div>
        </nav>
    )
}

function Logo() {

    return (
        <Link to="/" className={styles.logoContainer}>
            <div className={styles.logo}>
                <img className={styles.logoIcon} src="/images/logo.svg" />
                <h1 className={styles.logoText}>Dzo</h1>
            </div>
        </Link>
    )
}

function CenterLinks() {
    return (
        <div className={styles.centerLinks}>
            <Link onClick >MENU</Link>
            <Link>LOCATIONS</Link>
            <Link>OUR STORY</Link>
            <Link>GIFT VOUCHERS</Link>
            <Link to="careers">CAREERS</Link>
        </div>
    )
}

function MainLinks() {
    return (
        <div className={styles.mainLinks}>
            <Link>
                <img src="/images/icon-bag.svg" />
                <span>Book a Table</span>
            </Link>
            <Link>
                <img src="/images/icon-pin.svg" />
                <span>Find a Dzo</span>
            </Link>
        </div>
    )
}

function Hamburger() {
    const sidebarRef = useRef(null);

    function handleOpen() {
        sidebarRef.current.classList.add("open");
        document.body.style.overflow = "hidden"
    }

    return (
        <>
            <div onClick={handleOpen} className={styles.hamburger} >
                <div className={styles.lineTop}></div>
                <div></div>
                <div className={styles.lineBottom}></div>
            </div>
            <SideBar sidebarRef={sidebarRef}></SideBar>
        </>
    )
}

export default Navbar;