import { useRef, useEffect, useContext, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Socials } from "./Footer"
import sideBarImg from "/images/sidebar.jpg"
import { Meals } from "../main"
import pullOutComingSoon from "./pullOutComingSoon"
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
        document.body.style.overflow = "visible";
        let delay = null;
        if (location.pathname.includes("careers")) {
            setClosing(true);
            delay = 200;
        } else {
            handleClose();
            delay = 1000;
        }
        setTimeout(() => {
            ourMenuRef.current.scrollIntoView({
                behavior: "smooth",
            })
        }, delay)
    }

    function handleClose() {
        setClosing(true);
        setOpenSidebar(obj => ({ ...obj, isHalfway: true, isComplete: false }));
    }

    function moveToCareers() {
        if (location.pathname.includes("careers")) {
            handleClose();
        } else {
            document.body.style.overflow = "visible";
            setClosing(true)
        }
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
                    <Link onClick={pullOutComingSoon}>LOCATIONS</Link>
                    <Link onClick={pullOutComingSoon}>BOOKINGS</Link>
                    <NavLink to="/careers" onClick={moveToCareers}>CAREERS</NavLink>
                    <Link onClick={pullOutComingSoon}>CONTACT</Link>
                </div>
                <Socials styleModule={styles}></Socials>
                <div className={styles.bottomText}>
                    <a href="https://github.com/Odi000" target="_blank">Website by Odi000</a>
                    <p >© Copyright Dzo 2023.</p>
                </div>
                <button className={styles.close} onClick={handleClose}>
                    <svg viewBox="0 0 24 24"><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>
                </button>
            </div>
        </div>
    )
}

export default SideBar;