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
            if (!closing) {
                document.body.style.overflow = "hidden";
                setOpenSidebar(obj => ({ ...obj, isLoading: true }));
            } else {
                const handleTrasition = (e) => {
                    if (!(e.srcElement === sidebarRef.current)) return;
                    setIsSideBarOpen(false);
                    document.body.style.overflow = "visible";
                }
                sidebarRef.current.addEventListener("transitionend", handleTrasition);
            }
        } else if (openSidebar.isLoading) {
            if (!closing) {
                const handleTrasition = (e) => {
                    if (!(e.srcElement === sidebarRef.current)) return;
                    setOpenSidebar(obj => ({ ...obj, isLoading: false, isHalfway: true }));
                }
                sidebarRef.current.addEventListener("transitionend", handleTrasition);
                return () => sidebarRef.current.removeEventListener("transitionend", handleTrasition);
            } else {
                const handleTrasition = (e) => {
                    if (!(e.srcElement === sidebarRef.current)) return;
                    setOpenSidebar(obj => ({ ...obj, isLoading: false }));
                }
                sidebarRef.current.addEventListener("transitionend", handleTrasition);
                return () => sidebarRef.current.removeEventListener("transitionend", handleTrasition);
            }
        } else if (openSidebar.isHalfway) {
            if (!closing) {
                const handleTrasition = (e) => {
                    if (!(e.srcElement === sidebarRef.current)) return;
                    setOpenSidebar(obj => ({ ...obj, isHalfway: false, isComplete: true }));
                }
                sidebarRef.current.addEventListener("transitionend", handleTrasition);
                return () => sidebarRef.current.removeEventListener("transitionend", handleTrasition);
            } else {
                const handleTrasition = (e) => {
                    if (!(e.srcElement === sidebarRef.current.childNodes[0])) return;
                    setOpenSidebar(obj => ({ ...obj, isLoading: true, isHalfway: false }));
                }
                sidebarRef.current.addEventListener("transitionend", handleTrasition);
                return () => sidebarRef.current.removeEventListener("transitionend", handleTrasition);
            }
        }
    }, [openSidebar]);

    function scrollToMenu() {
        handleClose()
        setTimeout(() => {
            ourMenuRef.current.scrollIntoView({
                behavior: "smooth",
            })
        }, 1000)
    }

    function handleClose() {
        setClosing(true);
        setOpenSidebar(obj => ({ ...obj, isHalfway: true, isComplete: false }));
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