import { useRef, useEffect, useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { Socials } from "./Footer"
import sideBarImg from "/images/sidebar.jpg"
import { Meals } from "./Homepage"
import styles from "./css_modules/SideBar.module.css";

function SideBar({ sidebarRef }) {
    const { ourMenuRef } = useContext(Meals);

    function scrollToMenu() {
        handleClose()

        ourMenuRef.current.scrollIntoView({
            behavior: "smooth",
        })
    }

    function handleClose() {
        const classList = [...sidebarRef.current.classList];
        sidebarRef.current.classList.remove(classList.find(el=>el.match(/open/)));
        document.body.style.overflow = "visible";
    }

    return (
        <div className={styles.sidebar} ref={sidebarRef}>
            <div className={styles.image}><img src={sideBarImg} /></div>
            <div className={styles.options}>
                <div className={styles.links}>
                    <Link to="/" onClick={scrollToMenu} >MENU</Link>
                    <Link>LOCATIONS</Link>
                    <Link>BOOKINGS</Link>
                    <NavLink to="/careers" onClick={handleClose}>CAREERS</NavLink>
                    <Link>CONTACT</Link>
                </div>
                <Socials></Socials>
                <button className={styles.close} onClick={handleClose}>×</button>
            </div>
        </div>
    )
}

export default SideBar;