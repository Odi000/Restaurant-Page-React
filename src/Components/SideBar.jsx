import { useRef, useEffect, useContext, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Socials } from "./Footer"
import sideBarImg from "/images/sidebar.jpg"
import { Meals } from "./Homepage"
import styles from "./css_modules/SideBar.module.css";

function SideBar({ sidebarRef, setIsSideBarOpen, isSideBarOpen }) {
    const { ourMenuRef } = useContext(Meals);
    const [openSidebar, setOpenSidebar] = useState({ isLoading: false, isHalfway: false, isComplete: false });
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (!openSidebar.isLoading && !openSidebar.isHalfway && !openSidebar.isComplete) {
            document.body.style.overflow = "hidden";
            setOpenSidebar(obj => ({ ...obj, isLoading: true }));
        } else if (openSidebar.isLoading) {
            const handleTrasition = (e) => {
                if (!(e.srcElement === sidebarRef.current)) return;
                setOpenSidebar(obj => ({ ...obj, isLoading: false, isHalfway: true }));
            }
            sidebarRef.current.addEventListener("transitionend", handleTrasition);
            return () => removeEventListener("transitionend", handleTrasition);
        } else if (openSidebar.isHalfway) {
            const handleTrasition = (e) => {
                if (!(e.srcElement === sidebarRef.current)) return;
                setOpenSidebar(obj => ({ ...obj, isHalfway: false, isComplete: true }));
            }
            sidebarRef.current.addEventListener("transitionend", handleTrasition);
            return () => removeEventListener("transitionend", handleTrasition);
        }
    }, [openSidebar]);

    function scrollToMenu() {
        handleClose()

        ourMenuRef.current.scrollIntoView({
            behavior: "smooth",
        })
    }

    function handleClose() {
        setIsSideBarOpen(false);
        document.body.style.overflow = "visible";
    }

    return (
        <div className={openSidebar.isLoading ?
            `${styles.sidebar} ${styles.loading}` :
            openSidebar.isHalfway ?
                `${styles.sidebar} ${styles.halfway}` :
                openSidebar.isComplete ? `${styles.sidebar} ${styles.complete}` :
                    styles.sidebar
        } ref={sidebarRef}>
            <div className={styles.image}>
                <img src={sideBarImg} />
            </div>
            <div className={styles.options}>
                <div className={styles.linkz}>
                    <Link to="/" onClick={scrollToMenu} >MENU</Link>
                    <Link>LOCATIONS</Link>
                    <Link>BOOKINGS</Link>
                    <NavLink to="/careers" onClick={handleClose}>CAREERS</NavLink>
                    <Link>CONTACT</Link>
                </div>
                <Socials styleModule={styles}></Socials>
                <div className={styles.bottomText}>
                    <a href="https://github.com/Odi000" target="_blank">Website by Odi000</a>
                    <p >© Copyright Dzo 2023.</p>
                </div>
                <button className={styles.close} onClick={handleClose}>×</button>
            </div>
        </div>
    )
}

export default SideBar;