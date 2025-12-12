import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import SideBar from "./SideBar";
import styles from "./css_modules/Navbar.module.css";
import { Meals } from "../main";
import pullOutComingSoon from "./pullOutComingSoon";

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
    const { ourMenuRef } = useContext(Meals);
    const centerLinksRef = useRef(null);

    function scrollToMenu() {

        setTimeout(() => {
            ourMenuRef.current.scrollIntoView({
                behavior: "smooth",
            })
        }, 100)
    }

    const handleLinksScroll = () => {
        const pxScrolled = document.documentElement.scrollTop;
        centerLinksRef.current.style.top = `-${pxScrolled}px`;
    }

    useEffect(() => {
        window.addEventListener("scroll", handleLinksScroll);

        return () => removeEventListener("scroll", handleLinksScroll);
    }, [])

    return (
        <div ref={centerLinksRef} className={styles.centerLinks}>
            <Link to="/" onClick={scrollToMenu} >MENU</Link>
            <Link onClick={pullOutComingSoon} >LOCATIONS</Link>
            <Link onClick={pullOutComingSoon}>OUR STORY</Link>
            <Link onClick={pullOutComingSoon}>GIFT VOUCHERS</Link>
            <NavLink to="/careers" end  >CAREERS</NavLink>
        </div>
    )
}

function MainLinks() {
    return (
        <div className={styles.mainLinks}>
            <Link onClick={e=>pullOutComingSoon(e,"All tables are booked!")}>
                <img src="/images/icon-bag.svg" />
                <span>Book a Table</span>
            </Link>
            <Link onClick={pullOutComingSoon}>
                <img src="/images/icon-pin.svg" />
                <span>Find a Dzo</span>
            </Link>
        </div>
    )
}

function Hamburger() {
    const sidebarRef = useRef(null);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    function handleOpen() {
        setIsSideBarOpen(true);
    }

    return (
        <>
            <div onClick={handleOpen} className={styles.hamburger} >
                <div className={styles.lineTop}></div>
                <div></div>
                <div className={styles.lineBottom}></div>
            </div>
            {isSideBarOpen ?
                <SideBar
                    sidebarRef={sidebarRef}
                    isSideBarOpen={isSideBarOpen}
                    setIsSideBarOpen={setIsSideBarOpen} /> :
                ""
            }
        </>
    )
}

export default Navbar;